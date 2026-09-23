"""Topic modules: one file per topic, one authored sentence per function it declares.

Each module declares FUNCTIONS (the utterance space of that topic: what people actually
need to say about this subject) and SENTENCES (one or more authored sentences per
function). compose.assemble() refuses to build if a declared function has no sentence, so
a topic can never ship as a single example. uniqueness.py then checks that the sentences
inside a topic are not the same pattern with a word swapped.
"""
