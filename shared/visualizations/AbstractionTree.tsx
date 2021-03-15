import * as d3 from "d3";
import React, { useMemo, useState } from "react";
import { motion, useCycle } from "framer-motion";
import produce from "immer";

export type Tree = { name: string; children?: Tree[]; value?: number };

export const AbstractionTree = (props: { data: Tree }) => {
  const hierarchy = d3.hierarchy(props.data);
  hierarchy.sum((node) => node.value || 1);
  const d3tree = d3.tree<Tree>().nodeSize([4, 80])(hierarchy);
  return <TreeSVG tree={d3tree} />;
};

export const AbstractionTreeExample = () => {
  const data: Tree = {
    name: "Brew some tea",
    children: [
      {
        name: "Boil the kettle",
        children: [
          { name: "Take kettle off stand" },
          { name: "Fill kettle with water" },
          { name: "Put kettle on stand" },
          { name: "Press power button" },
        ],
      },
      {
        name: "Put teabag in mug",
        children: [
          { name: "Open box of tea" },
          { name: "Take teabag from box" },
          { name: "Drop teabag into mug" },
        ],
      },
      {
        name: "Fill mug with water",
        children: [
          { name: "Take kettle off stand" },
          { name: "Lift over mug such that mouths align" },
          { name: "Tilt kettle until water flows out" },
          { name: "Place kettle back to stand" },
        ],
      },
      {
        name: "Steep for 3 minutes",
        children: [{ name: "Go brush your teeth while you wait" }],
      },
      {
        name: "Remove teabag",
        children: [
          { name: "Take teaspoon from drawer" },
          { name: "Press bag against side of mug with teaspoon" },
          { name: "Lift the bag out" },
          { name: "Throw the bag away" },
        ],
      },
      {
        name: "Splash some milk in",
        children: [
          { name: "Open fridge" },
          { name: "Take milk out" },
          { name: "Open the bottle" },
          { name: "Align mouths" },
          { name: "Tilt until a small amount falls in" },
          { name: "Replace cap" },
          { name: "Put back into fridge" },
        ],
      },
    ],
  };

  return <AbstractionTree data={data} />;
};

const TreeSVG = (props: { tree: d3.HierarchyPointNode<Tree> }) => {
  const stages = [
    { viewBox: "0 -50 300 100", delay: 0, displayDepth: Infinity },
    { viewBox: "-25 -25 100 100", delay: 0.5, displayDepth: 0 },
    { viewBox: "-50 -50 200 200", delay: 0.5, displayDepth: 1 },
    { viewBox: "50 -50 210 210", delay: 0.5, displayDepth: 2 },
  ];
  const [stageProperties, cycle] = useCycle(...stages);

  return (
    <>
      <motion.svg
        animate={{
          viewBox: stageProperties.viewBox,
          transition: { bounce: 0, delay: stageProperties.delay },
        }}
        initial={{ viewBox: stages[0].viewBox }}
        onTap={() => cycle()}
      >
        <SVGTreeNodes tree={props.tree} />
        <SVGTreePaths tree={props.tree} depth={stageProperties.displayDepth} />
      </motion.svg>
    </>
  );
};

const SVGTreeNodes = (props: { tree: d3.HierarchyPointNode<Tree> }) => {
  const nodes = useMemo(
    () =>
      props.tree.descendants().map((node) => {
        return (
          <g
            key={`${node.x}${node.y}${node.value}`}
            transform={`translate(${node.y}, ${node.x})`}
          >
            <circle r={0.5} stroke="black" fill="white" opacity={0.1} />
            <text
              fontFamily="Overpass Mono"
              fontSize="4"
              transform="translate(2, 1)"
            >
              {node.data.name}
            </text>
          </g>
        );
      }),
    [props.tree]
  );
  return <>{nodes}</>;
};

const SVGTreePaths = (props: {
  tree: d3.HierarchyPointNode<Tree>;
  depth: number;
}) => {
  return (
    <>
      {props.tree
        .links()
        .filter((link) => link.target.depth <= props.depth)
        .map((link) => {
          const textWidth = link.source.data.name.length * 2.7;
          const sourceY = link.source.y + textWidth;
          return (
            <motion.path
              key={`${link.source.x}${link.source.y}${link.target.x}${link.target.y}`}
              d={d3.line().curve(d3.curveBasis)([
                [sourceY, link.source.x],
                [sourceY + (link.target.y - sourceY) / 3, link.source.x],
                [sourceY + (link.target.y - sourceY) / 1.5, link.target.x],
                [link.target.y, link.target.x],
              ])}
              stroke="black"
              strokeWidth={0.5}
              animate={{ opacity: 0.1 }}
              initial={{ opacity: 0.0 }}
              fill="none"
            />
          );
        })}
    </>
  );
};
