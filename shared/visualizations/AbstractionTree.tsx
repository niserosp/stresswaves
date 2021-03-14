import * as d3 from "d3";
import React, { useState } from "react";
import { motion } from "framer-motion";

export type Tree = { name: string; children?: Tree[]; value?: number };

export const AbstractionTree = (props: { data: Tree }) => {
  const hierarchy = d3.hierarchy(props.data);
  hierarchy.sum((node) => node.value || 1);
  const d3tree = d3.tree<Tree>().size([100, 150])(hierarchy);
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
  const [stage, setStage] = useState(0);
  const cycle = () => {
    setStage((x) => (x + 1) % 4);
  };

  const viewBox = stage < 3 ? `${-4 + stage * 75} 0 75 100` : `0 0 300 100`;

  return (
    <>
      <motion.svg
        animate={{
          viewBox,
          transition: { bounce: 0, delay: stage > 0 ? 0.5 : 0 },
        }}
        initial={{ viewBox: "200 0 75 100" }}
      >
        <SVGTreeNodes tree={props.tree} />
        <SVGTreePaths tree={props.tree} depth={stage} />
      </motion.svg>
      <button onClick={cycle}>&gt;</button>
    </>
  );
};

const SVGTreeNodes = (props: { tree: d3.HierarchyPointNode<Tree> }) => {
  return (
    <>
      {props.tree.descendants().map((node) => {
        return (
          <g
            key={`${node.x}${node.y}${node.value}`}
            transform={`translate(${node.y}, ${node.x})`}
          >
            <circle r={0.5} stroke="black" fill="white" opacity={0.1} />
            <text fontSize="4" transform="translate(3, 2)">
              {node.data.name}
            </text>
          </g>
        );
      })}
    </>
  );
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
          return (
            <motion.path
              key={`${link.source.x}${link.source.y}${link.target.x}${link.target.y}`}
              d={d3.line().curve(d3.curveBasis)([
                [link.source.y, link.source.x],
                [
                  link.source.y + (link.target.y - link.source.y) / 3,
                  link.source.x,
                ],
                [
                  link.source.y + (link.target.y - link.source.y) / 1.5,
                  link.target.x,
                ],
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
