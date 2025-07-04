"use client";

import { useEffect, useState } from 'react';
import { Alert, type AlertColor, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFlashMessage } from '@/context/FlashMessageContext';

export const FlashMessage = () => {
    // Contextから現在のメッセージと、クリア用の関数を取得
    const { flash, clearFlashMessage } = useFlashMessage();
    
    // Alertの表示/非表示を管理
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Contextに新しいメッセージがセットされたら、Alertを表示状態にする
        if (flash && flash.message) {
            setOpen(true);
            
            // 5秒後にメッセージを非表示にするタイマーを設定
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]); // flashオブジェクトが変更された時だけ、このエフェクトを実行

    // メッセージがなければ、何もレンダリングしない
    if (!flash || !flash.message) {
        return null;
    }

    return (
        // Collapseコンポーネントで、表示・非表示のアニメーションを制御
        <Collapse 
            in={open}
            // Contextの状態をクリアにする
            onExited={() => clearFlashMessage()}
        >
            <Alert 
                severity={flash.severity} 
                sx={{ mb: 2 }}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false); // クローズボタンで非表示
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {flash.message}
            </Alert>
        </Collapse>
    );
};
