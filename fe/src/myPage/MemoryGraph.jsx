import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import getEnv from "../utils/getEnv";
import SpriteText from "three-spritetext";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { GlobalColor } from "../services/color";
import styled from "styled-components";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
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
const MemoryGraphButton = styled(motion.div)`
  font-size: 0.75rem;
  padding: 0.9rem;
  font-weight: bold;
  background-color: #3f6ecd;
  color: white;
  border-radius: 50%;

  display: flex;
  align-items: center;
  cursor: pointer;
`;
const MemoryGraph = ({
  addnode,
  getGraphData,
  hadleAllClick,
  isDark,
  handleConfirm,
  changenode,
  handlefirst,
  content,
  setIsModal,
  isModal,
  color,
  graphData,
  setGraphData,
  setColor,
  newnode,
  setNewNode,
  setContent,
  fgRef,
  setWhatNode,
  whatnode,
  isMe,
  is2D,
  setIs2D,
}) => {
  const [addOnlyNode, setAddOnlyNode] = useState(false);
  const handlefirstreal = async () => {
    await addnode();
    getGraphData();
    setAddOnlyNode(false);
    setIsModal(false);
    setWhatNode(null);
    setContent("");
    setNewNode("");
    setColor("#c7c7c7");
  };
  // fgRef.d3Force('link').distance(link => "10rem");

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
        {graphData.nodes.length !== 0 && (
          <div
            onClick={() => setIs2D(!is2D)}
            style={{
              zIndex: 1,
              cursor: "pointer",
              color: "white",
              backgroundColor: "rgba(86, 76, 173, 1)",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              position: "absolute",
              top: "0",
              left: 0,
              fontSize: "0.8rem",
            }}
          >
            {is2D ? "2D" : "3D"}
          </div>
        )}

        {/* <div onClick={handlebutton}>button</div>  */}
        <AnimatePresence>
          {isMe && graphData.nodes.length !== 0 && !whatnode && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "0.5rem",
                zIndex: "1",
              }}
            >
              <MemoryGraphButton
                whileHover={{ y: -5 }}
                onClick={() => setAddOnlyNode(true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} size="xl" />
              </MemoryGraphButton>
            </motion.div>
          )}
        </AnimatePresence>

        {graphData.nodes.length !== 0 &&
          (is2D ? (
            <ForceGraph2D
              ref={fgRef}
              width={whatnode ? 475 : 675}
              height={475}
              graphData={graphData}
              nodeLabel={(node) => `
        <div class="shadow" style="display: flex; flex-direction: column; padding: 1rem; background-color: white; border-radius: 0.5rem;">
          <span style="color: #000000; margin: 0;">제목: ${node.label}</span>
          <span style="color: #000000; margin: 0;">내용: ${node.content}</span>
        </div>
      `}
              backgroundColor={
                isDark ? GlobalColor.colors.primary_black : "rgb(245, 248, 255)"
              }
              nodeRelSize={10}
              nodeOpacity={0.8}
              nodeResolution={50}
              linkOpacity={0.8}
              linkResolution={12}
              nodeColor={(node) => (node.color ? node.color : "#ffffff")}
              linkWidth={2}
              onNodeClick={(node) => hadleAllClick(node)}
            />
          ) : (
            // 여기에 is2d가 false일 때 렌더링할 다른 컴포넌트를 넣으세요
            <ForceGraph3D
              ref={fgRef}
              width={whatnode ? 475 : 675}
              height={475}
              graphData={graphData}
              nodeLabel={(node) => `
        <div class="shadow" style="display: flex; flex-direction: column; padding: 1rem; background-color: white; border-radius: 0.5rem;">
          <span style="color: #000000; margin: 0;">제목: ${node.label}</span>
          <span style="color: #000000; margin: 0;">내용: ${node.content}</span>
        </div>
      `}
              backgroundColor={
                isDark ? GlobalColor.colors.primary_black : "rgb(245, 248, 255)"
              }
              nodeRelSize={10}
              nodeOpacity={0.8}
              nodeResolution={50}
              linkOpacity={0.8}
              linkResolution={12}
              nodeColor={(node) => (node.color ? node.color : "#ffffff")}
              linkWidth={2}
              onNodeClick={(node) => hadleAllClick(node)}
            />
          ))}
        {!isMe && graphData.nodes.length == 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            아직 노드가 없습니다!
          </div>
        )}
        {isMe && graphData.nodes.length == 0 && (
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
                style={{
                  width: "82%",
                  display: "flex",
                  overflowY: "auto",
                  height: "5rem",
                }}
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
        {/* {whatnode && (
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
        )} */}
      </div>
      {isModal.type == "add" && (
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
            zIndex: 99,
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              // Handle your node actions here
            }}
            style={{
              width: "45%",
              height: "50%",
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
                  style={{
                    width: "82%",
                    display: "flex",
                    overflowY: "auto",
                    height: "5rem",
                  }}
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
                  setContent(""),
                  setNewNode(""),
                  setColor("#c7c7c7")
                )}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      )}

      {addOnlyNode && (
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
            zIndex: 99,
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              // Handle your node actions here
            }}
            style={{
              width: "45%",
              height: "50%",
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
                  style={{
                    width: "82%",
                    display: "flex",
                    overflowY: "auto",
                    height: "5rem",
                  }}
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
                onClick={() => handlefirstreal()}
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
                  setAddOnlyNode(false),
                  setContent(""),
                  setNewNode(""),
                  setColor("#c7c7c7")
                )}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      )}
      {isModal.type == "change" && (
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
            zIndex: 99,
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              // Handle your node actions here
            }}
            style={{
              width: "45%",
              height: "50%",
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
                  style={{
                    width: "82%",
                    display: "flex",
                    overflowY: "auto",
                    height: "5rem",
                  }}
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
                  setContent(""),
                  setNewNode(""),
                  setColor("#c7c7c7")
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
