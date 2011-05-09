#!/usr/bin/env python3

import sys

def to_bookmarklet(infile):
    """Convert a JS file to a bookmarklet."""
    joined = ''.join(l.strip() for l in infile.readlines())
    replaced = joined.replace(' ', '%20')
    return "javascript:" + replaced

def main():
    print(to_bookmarklet(sys.stdin))

if __name__ == "__main__":
    sys.exit(main())
