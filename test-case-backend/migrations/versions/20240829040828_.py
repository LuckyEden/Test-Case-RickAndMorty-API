"""empty message

Revision ID: 858baed5882f
Revises: 
Create Date: 2024-08-29 04:08:28.328525

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '858baed5882f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('species', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=False),
    sa.Column('origin_name', sa.String(), nullable=True),
    sa.Column('origin_url', sa.String(), nullable=True),
    sa.Column('location_name', sa.String(), nullable=True),
    sa.Column('location_url', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('url')
    )
    op.create_table('episodes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('air_date', sa.String(), nullable=False),
    sa.Column('episode', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('url')
    )
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('dimension', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('url')
    )
    op.create_table('character_episode_association',
    sa.Column('character_id', sa.Integer(), nullable=True),
    sa.Column('episode_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], ),
    sa.ForeignKeyConstraint(['episode_id'], ['episodes.id'], )
    )
    op.create_table('location_resident_association',
    sa.Column('character_id', sa.Integer(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], ),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], )
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('location_resident_association')
    op.drop_table('character_episode_association')
    op.drop_table('locations')
    op.drop_table('episodes')
    op.drop_table('characters')
    # ### end Alembic commands ###
