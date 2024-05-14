import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ForceGraph from "react-force-graph-3d";
import getEnv from "../utils/getEnv";
import SpriteText from "three-spritetext";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { GlobalColor } from "../services/color";
function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}
const MemoryGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const back_url = getEnv("BACK_URL");
  const GROUPS = 12;
  const isDark = useSelector((state) => state.isDark.isDark);
  const [color, setColor] = useState("#000000");
  //   const [islabel, setIslabel] = useState(false);
  const [whatnode, setWhatNode] = useState(null);
  const [newnode, setNewNode] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [content, setContent] = useState("");
  const getGraphData = async () => {
    try {
      const res = await axios.get(`${back_url}/nMember`);
      const memberList = res.data.result;
      // console.log(memberList.result);
      let nodes = [];
      let links = [];
      console.log(memberList);
      memberList.forEach((memo) => {
        //   console.log(memo);
        const memoNodes = memo.nodeList.map((node) => ({
          id: node.id,
          label: node.label,
          content: node.content,
        }));

        const memoLinks = memo.linkList.map((link) => ({
          source: link.source,
          target: link.target,
        }));

        nodes = [...nodes, ...memoNodes];
        links = [...links, ...memoLinks];
      });

      console.log(nodes);
      console.log(links);

      setGraphData({ nodes, links });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getGraphData();
  }, []);
  const fgRef = useRef();
  //   const gData = genRandomTree();
  //   console.log(gData);
  const addnode = async () => {
    console.log(newnode);
    console.log(content);
    try {
      const res = await axios.post(
        `${back_url}/memo`,
        {
          title: newnode, // newnode 변수를 제목으로 사용
          content: content, // content 변수를 내용으로 사용
          color: color,
        },
        { withCredentials: true }
      );
      return res.data.result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const connectnode = async (newnodeid) => {
    try {
      const res = await axios.put(
        `${back_url}/memo?memoId1=${whatnode.id}&memoId2=${newnodeid}`,
        { withCredentials: true }
      );
      console.log(res);
      await getGraphData();
      const distance = 500;
      const distRatio =
        1 + distance / Math.hypot(whatnode.x, whatnode.y, whatnode.z);

      fgRef.current.cameraPosition(
        {
          x: whatnode.x * distRatio,
          y: whatnode.y * distRatio,
          z: whatnode.z * distRatio,
        }, // new position
        whatnode, // lookAt ({ x, y, z })
        1500 // ms transition duration
      );
      setIsModal(false);
      setWhatNode(null);
      setContent("");
      setNewNode("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 500;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        1500 // ms transition duration
      );
      //   fgRef = 0;
    },
    [fgRef]
  );

  const hadleAllClick = (node) => {
    // Aim at node from outside it
    setWhatNode(node);
    console.log(node);
    const distance = 500;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio,
      }, // new position
      node, // lookAt ({ x, y, z })
      1500 // ms transition duration
    );
    //   fgRef = 0;
  };
  //   console.log(color);

  const handleConfirm = async () => {
    const newnodeid = await addnode();
    connectnode(newnodeid);
  };
  return (
    <div
      onClick={() => (setWhatNode(null), setIsModal(false))}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* <div onClick={handlebutton}>button</div>  */}
      {
        <ForceGraph
          ref={fgRef}
          width={680}
          height={475}
          graphData={graphData}
          nodeLabel={(node) => `
          <div class="shadow" style="display: flex; flex-direction: column; padding: 1rem; background-color: white; border-radius: 0.5rem;">
            <span style="color: #000000; margin : 0">${node.label}</span>
            <span style="color: #000000; margin : 0">${node.content}</span>
          </div>
        `}
          backgroundColor={isDark ? GlobalColor.colors.primary_black : "white"}
          nodeRelSize={10}
          nodeOpacity={1}
          nodeResolution={50}
          linkOpacity={1}
          linkResolution={12}
          nodeColor={(node) => (node.color ? node.color : "blue")}
          //   linkColor={(node) => (node.id === "node1" ? "red" : "blue")}
          //   nodeAutoColorBy={(d) => d.id % GROUPS}
          //   linkAutoColorBy={(d) => gData.nodes[d.source].id % GROUPS}
          linkDirectionalArrowLength={13}
          linkDirectionalArrowRelPos={0}
          linkWidth={2}
          //   numDimensions={3}
          onNodeClick={(node) => hadleAllClick(node)}
        />
      }
      {whatnode && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            // Handle your node actions here
          }}
          style={{
            position: "absolute",
            top: "40%",
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              backgroundColor: "#3085d6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
            }}
            onClick={() => setIsModal(true)}
          >
            수정
          </div>
          <div
            style={{
              cursor: "pointer",
              backgroundColor: "#d33",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
            }}
          >
            삭제
          </div>
        </div>
      )}
      {isModal && whatnode && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              // Handle your node actions here
            }}
            style={{
              width: "80%",
              height: "80%",
              backgroundColor: "White",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  //   marginBottom: "1rem",
                }}
              >
                <div style={{ width: "18%" }}>시작노드 </div>
                <div> {whatnode.label}</div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //   marginBottom: "1rem",
                }}
              >
                <div style={{ width: "18%" }}>새로운 노드 </div>
                <Form.Control
                  style={{ width: "82%" }}
                  type="text"
                  placeholder="노드 이름"
                  value={newnode}
                  onChange={(e) => setNewNode(e.target.value)}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //   marginBottom: "1rem",
                }}
              >
                <div style={{ width: "18%" }}>내용 </div>
                <Form.Control
                  style={{ width: "82%" }}
                  type="text"
                  placeholder="내용"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  //   marginBottom: "1rem",
                  gap: "1rem",
                }}
              >
                <div style={{ width: "18%" }}>노드 색 입력 </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                {color}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "#3085d6",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                }}
                onClick={() => handleConfirm()}
              >
                확인
              </div>
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "#d33",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                }}
                onClick={() => (
                  setIsModal(false),
                  setWhatNode(null),
                  setContent(""),
                  setNewNode("")
                )}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGraph;
