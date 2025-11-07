"use client";
import katex from 'katex';
import React from 'react';

type Props = {
  children: string;
  block?: boolean;
};

export default function MathRenderer({ children, block = false }: Props) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: block,
        throwOnError: false,
        strict: 'ignore',
        output: 'html',
        trust: true,
        macros: { '\\RR': '\\mathbb{R}', '\\NN': '\\mathbb{N}' }
      });
    } catch (e) {
      return children;
    }
  }, [children, block]);

  return (
    <span className={block ? 'katex-display block' : 'inline-block'} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
