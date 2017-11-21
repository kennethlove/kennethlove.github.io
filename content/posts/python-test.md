+++
title = "Python Test"
date = 2017-10-31T16:51:30-07:00
draft = false
tags = ["python", "code"]
categories = ["Blog"]
+++

Here's some text that will be followed by a snippet of Python code. This is purely to test out the code highlighting with the fairyfloss theme.


{{< highlight python "linenos=table,hl_lines=8 15-17" >}}
from typing import List

from apistar import App, Include, Route, http
from apistar.backends import SQLAlchemy
from apistar.commands import create_tables
from apistar.docs import docs_routes
from apistar.statics import static_routes
from apistar.templating import Template

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

from game_schema import games, GameSchema, write


Base = declarative_base()


class Game(Base):
    __tablename__ = "Game"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    designer = Column(String)
    player_count = Column(Integer)
    duration = Column(Integer)


# comment
def _convert_num(num):
    if num.isnumeric():
        if '.' in num:
            return float(num)
        return int(num)
    return 0


def welcome(index: Template):
    return index.render()


def add_game(db: SQLAlchemy, game: GameSchema):
    session = db.session_class()
    new_game = Game(**game)
    session.add(new_game)
    session.commit()
    return {'message': game}


def list_games(db: SQLAlchemy) -> List[GameSchema]:
    session = db.session_class()
    query = session.query(Game)
    query.all()
    return [GameSchema(game) for game in query]


def search(query_params: http.QueryParams) -> List[GameSchema]:
    """Docstring"""
    games_dict = games.dict
    qp = dict(query_params)
    for key in [key for key in qp if key in ['name', 'designer', 'player_count', 'duration']]:
        games_dict = filter(
            lambda x: ' '.join(qp[key]).lower() in x[key].lower(),
            games_dict
        )
    return [GameSchema(game) for game in list(games_dict)]


routes = [
    Route('/', 'GET', welcome),
    Route('/add', 'POST', add_game),
    Route('/list', 'GET', list_games),
    Route('/search', 'GET', search),
    Include('/docs', docs_routes),
    Include('/static', static_routes)
]

settings = {
    'STATICS': {
        'DIR': 'static'
    },
    'TEMPLATES': {
        'DIRS': ['templates']
    },
    'DATABASE': {
        'URL': 'sqlite:///games.db',
        'METADATA': Base.metadata
    }
}

app = App(routes=routes, settings=settings, commands=[create_tables])
{{< / highlight >}}