"""empty message

Revision ID: 7a629e6b4e8f
Revises: 1eaa52fd66a3
Create Date: 2024-02-14 17:42:59.777603

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7a629e6b4e8f'
down_revision = '1eaa52fd66a3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=128), nullable=True))
        batch_op.drop_column('user_focus')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_focus', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###