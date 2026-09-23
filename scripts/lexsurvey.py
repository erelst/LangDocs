#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Report every surface a topic module uses that has not been glossed yet.

Writing a topic means reaching for words the shared lexicon has not met. The build raises
on the first one, which is correct for shipping but useless for authoring: you would fix
one word, rerun, meet the next one, and do that forty times.

So this walks the topic modules with a stand-in sent() that records the unknown surfaces
instead of raising. A surface counts as known if the shared lexicon has it OR the module's
own add_words() call declares it, so the report contains only the words genuinely still
missing, grouped by module and ready to paste into add_words().
"""
import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import compose  # noqa: E402

_real_sent = compose.sent
_real_add = compose.add_words

missing = {}       # module -> [surfaces in first-seen order]
cross = {}         # surface -> [(module, prior entry, new entry)] between topics
declared = {}      # module -> {surface: entry} from that module's own add_words()
CURRENT = [None]


def _stub_sent(key, rel, words, *a, **kw):
    """Record unknown surfaces, then return a throwaway row so the module keeps importing."""
    known = set(compose.LEX) | set(declared.get(CURRENT[0], {}))
    for surface in words:
        if surface in compose.PUNCT or surface in known:
            continue
        bucket = missing.setdefault(CURRENT[0], [])
        if surface not in bucket:
            bucket.append(surface)
    return {'key': key, 'fn': kw.get('fn', '?'), 'who': 'dekat', 'tokens': [],
            'politeness': 'sopan', 'kanji': '', 'romaji': '', 'who_id': '', 'who_en': '',
            'id_translation': '', 'en_translation': '', 'situation': '', 'situation_en': '',
            'note': '', 'note_en': ''}


def _stub_add(words, where=''):
    """Record this module's declarations AND apply them.

    Applying them is what lets the survey see a conflict between two TOPICS: t00_sapaan
    glosses アリ one way, t02_orang glosses it another, and only the accumulation shows it.
    Without this the survey disagreed with the build, which is worse than not having it.
    """
    bucket = declared.setdefault(CURRENT[0], {})
    for surface, entry in words.items():
        entry = tuple(entry)
        bucket[surface] = entry
        prior = compose.LEX.get(surface)
        if prior is not None and tuple(prior) != entry:
            cross.setdefault(surface, []).append((CURRENT[0], prior, entry))
        else:
            compose.LEX[surface] = entry


def survey(modules):
    """Walk the modules with the stand-ins installed, then put the real ones back."""
    compose.sent = _stub_sent
    compose.add_words = _stub_add
    try:
        for name in modules:
            CURRENT[0] = name
            importlib.import_module('topics.' + name)
    finally:
        compose.sent = _real_sent
        compose.add_words = _real_add
    return missing


def main():
    modules = sys.argv[1:] or compose.existing_topics()
    unknown = survey(modules)

    # A module that re-declares a base word is either redundant (same gloss, delete it) or
    # in conflict (different gloss, decide which meaning wins). Both are worth seeing here
    # rather than meeting them one at a time as a build error.
    conflicts, redundant = [], []
    for name in modules:
        for surface, entry in declared.get(name, {}).items():
            base = compose.LEX_BASE.get(surface)
            if base is None:
                continue
            if tuple(base) == tuple(entry):
                redundant.append((name, surface))
            else:
                conflicts.append((name, surface, base, entry))

    for name, surface in redundant:
        print(f'same  {name}: {surface!r} already glossed identically in the base lexicon')
    for name, surface, base, entry in conflicts:
        print(f'CLASH {name}: {surface!r} base={base} module={entry}')
    for surface, hits in cross.items():
        for name, prior, entry in hits:
            print(f'CLASH {surface!r}: {name} glosses it {entry}, but an earlier topic '
                  f'registered {prior}')

    if not unknown and not conflicts and not cross:
        print(f'every surface in {len(modules)} topic module(s) is glossed')
        return 1 if redundant else 0

    total = 0
    for name in modules:
        surfaces = unknown.get(name)
        if not surfaces:
            continue
        total += len(surfaces)
        print(f'== {name}: {len(surfaces)} surface(s) still unglossed')
        for surface in surfaces:
            print(f"    '{surface}': ('?', '', ''),")
        print()
    print(f'{total} surface(s) unglossed, {len(conflicts) + len(cross)} clash(es), '
          f'{len(redundant)} redundant')
    return 1


if __name__ == '__main__':
    raise SystemExit(main())
