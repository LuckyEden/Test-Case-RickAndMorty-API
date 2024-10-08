"""empty message

Revision ID: f2d15f6abe2f
Revises: 858baed5882f
Create Date: 2024-08-29 04:10:22.928413

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f2d15f6abe2f'
down_revision: Union[str, None] = '858baed5882f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('location_resident_association')
    op.drop_table('character_episode_association')
    op.add_column('characters', sa.Column('origin_id', sa.Integer(), nullable=True))
    op.add_column('characters', sa.Column('location_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'characters', 'locations', ['location_id'], ['id'])
    op.create_foreign_key(None, 'characters', 'locations', ['origin_id'], ['id'])
    op.drop_column('characters', 'origin_url')
    op.drop_column('characters', 'origin_name')
    op.drop_column('characters', 'location_name')
    op.drop_column('characters', 'location_url')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('characters', sa.Column('location_url', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('characters', sa.Column('location_name', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('characters', sa.Column('origin_name', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('characters', sa.Column('origin_url', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'characters', type_='foreignkey')
    op.drop_constraint(None, 'characters', type_='foreignkey')
    op.drop_column('characters', 'location_id')
    op.drop_column('characters', 'origin_id')
    op.create_table('character_episode_association',
    sa.Column('character_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('episode_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], name='character_episode_association_character_id_fkey'),
    sa.ForeignKeyConstraint(['episode_id'], ['episodes.id'], name='character_episode_association_episode_id_fkey')
    )
    op.create_table('location_resident_association',
    sa.Column('character_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('location_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], name='location_resident_association_character_id_fkey'),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], name='location_resident_association_location_id_fkey')
    )
    # ### end Alembic commands ###
