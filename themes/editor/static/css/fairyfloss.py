# -*- coding: utf-8 -*-
"""
    Fairyfloss Colorscheme
    ~~~~~~~~~~~~~~~~~~~~~~

    Converted by Vim Colorscheme Converter
"""
from pygments.style import Style
from pygments.token import Token, Comment, Name, Keyword, Generic, Number, Operator, String

class FairyflossStyle(Style):

    background_color = '#5a5475'
    styles = {
        Token:              'noinherit #f8f8f2 bg:#5a5475',
        Comment.Preproc:    'noinherit #ffb8d1',
        Name.Entity:        'noinherit #f8f8f2',
        Generic.Heading:    '#f8f8f2 bold',
        Generic.Emph:       'underline',
        Name.Tag:           'noinherit #ffb8d1',
        Name.Function:      'noinherit #fff352',
        Generic.Traceback:  'noinherit #f8f8f0 bg:#f92672',
        Name.Variable:      'noinherit #c2ffdf italic',
        Generic.Subheading: '#f8f8f2 bold',
        Generic.Output:     'noinherit #a8757b bg:#625c7b',
        Keyword:            'noinherit #ffb8d1',
        Generic.Inserted:   '#f8f8f2 bg:#508c1c bold',
        Number.Float:       'noinherit #c5a3ff',
        Keyword.Type:       'noinherit',
        Name.Constant:      'noinherit',
        String:             'noinherit #ffea00',
        Comment:            'noinherit #e6c000',
        Name.Attribute:     'noinherit #fff352',
        Number:             'noinherit #c5a3ff',
        Name.Label:         'noinherit #ffea00',
        Generic.Deleted:    'noinherit #951117',
        Operator.Word:      'noinherit #ffb8d1',
    }
