---
date: 2013-04-07 22:04:58
layout: post
publish: true
tags: [mercurial, pre-commit, hooks]
title: hg commit --prevent-stupidity

---


I've had a pre-commit hook in my mercurial ``~/.hgrc`` for some time, that prevents me from commiting code that contains the string ``import pdb; pdb.set_trace()``.

I've pushed commits containing this out to testing lots of times, and I think even onto production once or twice...

So, the pre-commit hook that has been doing that this is:

{% highlight ini %}
[hooks]
pretxncommit.pdb_found = hg export tip | (! egrep -q '^\+[^\+].*set_trace\(\)')
{% endhighlight %}

This uses a regular expression check to see if the string matches. However, it does not show the filename, and the other day I was burned by leaving in a ``console.time(...)`` statement in a javascript file. So, I've improved the pre-commit hook, so it can do a bit more.

{% highlight python %}
## <somewhere-in-your-PYTHONPATH>/hg_hooks/debug_statements.py

import sys
import _ast
import re

class colour:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    END = '\033[0m'

ERROR_HEADER = "*** Unable to commit. There were errors in %s files. ***"
ERROR_MESSAGE = """  File "%s/%s", line %i,
%s%s%s"""

def syntax_check(filename, data):
    try:
        tree = compile(data, filename, "exec", _ast.PyCF_ONLY_AST)
    except SyntaxError:
        value = sys.exc_info()[1]
        msg = value.args[0]

        (lineno, offset, text) = value.lineno, value.offset, value.text
        
        if text is None:
            raise
        
        return lineno, ("%s: %s" % (msg, text)).strip('\n')

ERRORS = {
    'py': [
        re.compile('(^[^#]*import pdb; pdb.set_trace\(\))'),
        syntax_check
    ],
    'js': [
        re.compile('(^[^(//)]*console\.[a-zA-Z]+\(.*\))'),
        re.compile('(^[^(//)]*debugger;)')
    ],
}

def test_data(filename, data):
    for matcher in ERRORS.get(filename.split('.')[-1], []):
        if hasattr(matcher, 'finditer'):
            search = matcher.finditer(data)
            if search:
                for match in search:
                    line_number = data[:match.end()].count('\n')
                    yield line_number + 1, data.split('\n')[line_number]
        elif callable(matcher):
            errors = matcher(filename, data)
            if errors:
                yield errors

def test_repo(ui, repo, node=None, **kwargs):
    changeset = repo[node]
    
    errors = {}
    
    for filename in changeset:
        data = changeset.filectx(filename).data()
        our_errors = list(test_data(filename, data))
        if our_errors:
            errors[filename] = our_errors        
    
    if errors:
        print colour.HEADER + ERROR_HEADER % len(errors) + colour.END
        for filename, error_list in errors.items():
            print 
            for line_number, message in error_list:
                print ERROR_MESSAGE  % (
                    repo.root, filename, line_number,
                    colour.FAIL, message, colour.END,
                )
        print
        return True
{% endhighlight %}

Then, add the hook to your ``.hgrc``:

{% highlight ini %}
[hooks]
pretxncommit.debug_statements = python:hg_hooks.debug_statements.test_repo
{% endhighlight %}

Note: I've updated the script to correctly show the line number since the start of the file, rather than the line number within the currently processed segment. Thanks to Vinay for reminding me about that!