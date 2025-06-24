"""Create users table and add FK to problems table

Revision ID: 45e2b7cbbf2e
Revises: 1d29179da119
Create Date: 2025-06-12 13:06:03.537158

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '45e2b7cbbf2e'
down_revision: Union[str, None] = '1d29179da119'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.add_column('problems', sa.Column('user_id', sa.Integer(), nullable=False))
    op.alter_column('problems', 'subject',
                    existing_type=sa.VARCHAR(length=255),
                    nullable=True)
    op.create_index(op.f('ix_problems_id'), 'problems', ['id'], unique=False)
    op.create_index(op.f('ix_problems_user_id'), 'problems', ['user_id'], unique=False)
    op.create_foreign_key('fk_problems_user_id', 'problems', 'users', ['user_id'], ['id'])


def downgrade() -> None:
    op.drop_constraint('fk_problems_user_id', 'problems', type_='foreignkey')
    op.drop_index(op.f('ix_problems_user_id'), table_name='problems')
    op.drop_index(op.f('ix_problems_id'), table_name='problems')
    op.alter_column('problems', 'subject',
                    existing_type=sa.VARCHAR(length=255),
                    nullable=False)
    op.drop_column('problems', 'user_id')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
