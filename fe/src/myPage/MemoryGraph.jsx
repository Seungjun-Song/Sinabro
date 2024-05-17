import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ForceGraph from "react-force-graph-3d";
import getEnv from "../utils/getEnv";
import SpriteText from "three-spritetext";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { GlobalColor } from "../services/color";
// function genRandomTree(N = 300, reverse = false) {
//   return {
//     nodes: [...Array(N).keys()].map((i) => ({ id: i })),
//     links: [...Array(N).keys()]
//       .filter((id) => id)
//       .map((id) => ({
//         [reverse ? "target" : "source"]: id,
//         [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
//       })),
//   };
// }
const MemoryGraph = ({ setWhatNode, whatnode }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [isfirst, setIsFirst] = useState(false);
  const back_url = getEnv("BACK_URL");

  const isDark = useSelector((state) => state.isDark.isDark);
  const [color, setColor] = useState("#c7c7c7");
  //   const [islabel, setIslabel] = useState(false);

  const [newnode, setNewNode] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [content, setContent] = useState(" ");
  const getGraphData = async () => {
    try {
      const res = await axios.get(`${back_url}/memo`);
      const memberList = res.data.result;
      console.log(memberList);

      setGraphData({ nodes: memberList.nodeList, links: memberList.linkList });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const changenode = async () => {
    if (newnode == "") {
      return;
    } else if (content == "") {
      return;
    }
    console.log(newnode);
    console.log(content);
    try {
      const res = await axios.put(`${back_url}/memo/update`, {
        memoId: whatnode.id,
        title: newnode,
        content: content,
        color: color,
      });
      console.log(res);
      setIsModal(false);
      setWhatNode(null);
      setContent("");
      setNewNode("");
      setColor("#c7c7c7");
      await getGraphData();
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
    console.log(color);
    if (newnode == "") {
      return;
    } else if (content == "") {
      return;
    }
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
      console.log(fgRef.current);
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
      setColor("#c7c7c7");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hadleAllClick = (node) => {
    // Aim at node from outside it
    setWhatNode(node);
    console.log(node);
    const distance = 500;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    if (graphData.nodes.length !== 0) {
      fgRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        1500 // ms transition duration
      );
    }
    //   fgRef = 0;
  };
  //   console.log(color);
  const handleDelete = async () => {
    // 경고 창을 통해 사용자에게 확인 메시지를 표시
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    // 사용자가 확인을 선택한 경우에만 삭제 진행
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${back_url}/memo?memoId=${whatnode.id}`,
          {
            withCredentials: true,
          }
        );
        // 삭제 성공
        setIsModal(false);
        setWhatNode(null);
        setContent("");
        setNewNode("");
        setColor("#c7c7c7");
        await getGraphData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleConfirm = async () => {
    const newnodeid = await addnode();
    connectnode(newnodeid);
  };
  const handlefirst = async () => {
    await addnode();
    getGraphData();
  };
  return (
    <>
      <div
        onClick={() => setIsModal(false)}
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
        {graphData.nodes.length !== 0 && (
          <ForceGraph
            ref={fgRef}
            width={whatnode ? 475 : 675}
            height={475}
            graphData={graphData}
            nodeLabel={(node) => `
          <div class="shadow" style="display: flex; flex-direction: column; padding: 1rem; background-color: white; border-radius: 0.5rem;">
            <span style="color: #000000; margin : 0">제목 :${node.label}</span>
            <span style="color: #000000; margin : 0">내용 :${node.content}</span>
          </div>
        `}
            backgroundColor={
              isDark ? GlobalColor.colors.primary_black : "white"
            }
            nodeRelSize={10}
            nodeOpacity={0.7}
            nodeResolution={50}
            linkOpacity={1}
            linkResolution={12}
            nodeColor={(node) => (node.color ? node.color : "#c7c7c7")}
            // linkColor={(node) => (node.id === "node1" ? "red" : "blue")}
            //   nodeAutoColorBy={(d) => d.id % GROUPS}
            //   linkAutoColorBy={(d) => gData.nodes[d.source].id % GROUPS}
            // linkDirectionalArrowLength={13}
            // linkDirectionalArrowRelPos={0}
            linkWidth={2}
            //   numDimensions={3}
            onNodeClick={(node) => hadleAllClick(node)}
          />
        )}
        {graphData.nodes.length == 0 && !isfirst && (
          <div
            style={{
              width: "35rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <div>아직 노드가 없어요! 새롭게 추가해봐요</div>
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "#3085d6",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                }}
                onClick={() => handlefirst()}
              >
                확인
              </div>
            </div>
          </div>
        )}
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
                backgroundColor: "#d69f30",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
              }}
              onClick={() => setIsModal({ type: "add" })}
            >
              추가
            </div>
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#3085d6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
              }}
              onClick={() => (
                setIsModal({ type: "change" }),
                setColor(whatnode.color),
                setContent(whatnode.content),
                setNewNode(whatnode.label)
              )}
            >
              수정
            </div>
            <div
              onClick={() => handleDelete()}
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
      </div>
      {isModal.type == "add" && whatnode && (
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
                  setNewNode(""),
                  setColor("")
                )}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      )}
      {isModal.type == "change" && whatnode && (
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
              {/* <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                //   marginBottom: "1rem",
              }}
            >
              <div style={{ width: "18%" }}>시작노드 </div>
              <div> {whatnode.label}</div>
            </div> */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //   marginBottom: "1rem",
                }}
              >
                <div style={{ width: "18%" }}>노드 이름</div>
                <Form.Control
                  style={{ width: "82%" }}
                  type="text"
                  placeholder={whatnode.label}
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
                  placeholder={whatnode.content}
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
                onClick={() => changenode()}
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
                  setNewNode(""),
                  setColor("")
                )}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemoryGraph;
