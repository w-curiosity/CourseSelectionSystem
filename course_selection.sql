/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : course_selection

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 08/07/2020 20:50:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for c
-- ----------------------------
DROP TABLE IF EXISTS `c`;
CREATE TABLE `c`  (
  `kh` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `km` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `xf` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `xs` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `yxh` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bili` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`kh`) USING BTREE,
  INDEX `yxh`(`yxh`) USING BTREE,
  CONSTRAINT `c_ibfk_1` FOREIGN KEY (`yxh`) REFERENCES `d` (`yxh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c
-- ----------------------------
INSERT INTO `c` VALUES ('08301001', '分子物理学', '4', '40', '03', '0.5');
INSERT INTO `c` VALUES ('08302001', '通信原理', '3', '30', '02', '0.5');
INSERT INTO `c` VALUES ('08305001', '离散数学', '4', '40', '01', '0.7');
INSERT INTO `c` VALUES ('08305002', '数据库原理', '4', '50', '01', '0.5');
INSERT INTO `c` VALUES ('08305003', '数据结构', '4', '50', '01', '0.5');
INSERT INTO `c` VALUES ('08305004', '系统结构', '6', '60', '01', '0.5');

-- ----------------------------
-- Table structure for d
-- ----------------------------
DROP TABLE IF EXISTS `d`;
CREATE TABLE `d`  (
  `yxh` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mc` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dz` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `lxdh` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`yxh`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of d
-- ----------------------------
INSERT INTO `d` VALUES ('01', '计算机科学与技术', '嘉定校区智信馆四楼', '69589359');
INSERT INTO `d` VALUES ('02', '通信工程', '嘉定校区智信馆七楼', '69589224');
INSERT INTO `d` VALUES ('03', '物理科学与工程', '四平路校区物理馆', '65983380');

-- ----------------------------
-- Table structure for e
-- ----------------------------
DROP TABLE IF EXISTS `e`;
CREATE TABLE `e`  (
  `xh` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xq` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kh` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gh` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pscj` int(0) NULL DEFAULT NULL,
  `kscj` int(0) NULL DEFAULT NULL,
  `zpcj` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`kh`, `xq`, `xh`, `gh`) USING BTREE,
  INDEX `xh`(`xh`) USING BTREE,
  INDEX `gh`(`gh`) USING BTREE,
  CONSTRAINT `e_ibfk_1` FOREIGN KEY (`kh`) REFERENCES `c` (`kh`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `e_ibfk_2` FOREIGN KEY (`xh`) REFERENCES `s` (`xh`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `e_ibfk_3` FOREIGN KEY (`gh`) REFERENCES `t` (`gh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of e
-- ----------------------------
INSERT INTO `e` VALUES ('1101', '2018-2019冬季', '08302001', '0201', 0, 0, 0);
INSERT INTO `e` VALUES ('1102', '2018-2019冬季', '08302001', '0201', 0, 0, 0);
INSERT INTO `e` VALUES ('1104', '2020-2021冬季', '08302001', '0201', NULL, NULL, NULL);
INSERT INTO `e` VALUES ('1101', '2019-2020秋季', '08305001', '0103', 60, 60, 60);
INSERT INTO `e` VALUES ('1102', '2019-2020秋季', '08305001', '0103', 87, 87, 87);
INSERT INTO `e` VALUES ('1103', '2019-2020秋季', '08305001', '0102', NULL, NULL, NULL);
INSERT INTO `e` VALUES ('1103', '2019-2020秋季', '08305001', '0103', 56, 56, 56);
INSERT INTO `e` VALUES ('1104', '2019-2020秋季', '08305001', '0103', 74, 74, 74);
INSERT INTO `e` VALUES ('1106', '2019-2020秋季', '08305001', '0103', 85, 85, 85);
INSERT INTO `e` VALUES ('1107', '2019-2020秋季', '08305001', '0103', 90, 90, 90);
INSERT INTO `e` VALUES ('1102', '2018-2019冬季', '08305002', '0101', 80, 80, 0);
INSERT INTO `e` VALUES ('1102', '2018-2019冬季', '08305002', '0102', 0, 0, 0);
INSERT INTO `e` VALUES ('1102', '2019-2020冬季', '08305002', '0101', 80, 80, 82);
INSERT INTO `e` VALUES ('1103', '2019-2020冬季', '08305002', '0102', 75, 75, 75);
INSERT INTO `e` VALUES ('1106', '2019-2020冬季', '08305002', '0103', 66, 66, 66);
INSERT INTO `e` VALUES ('1103', '2019-2020冬季', '08305003', '0102', 84, 84, 84);
INSERT INTO `e` VALUES ('1107', '2019-2020冬季', '08305003', '0102', 79, 79, 79);
INSERT INTO `e` VALUES ('1102', '2020-2021秋季', '08305004', '0101', NULL, NULL, NULL);
INSERT INTO `e` VALUES ('1103', '2020-2021秋季', '08305004', '0101', NULL, NULL, NULL);
INSERT INTO `e` VALUES ('1107', '2020-2021秋季', '08305004', '0101', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login`  (
  `username` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `role_id` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_name` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('0101', '0101', '2', '教师');
INSERT INTO `login` VALUES ('0102', '0102', '2', '教师');
INSERT INTO `login` VALUES ('0103', '0103', '2', '教师');
INSERT INTO `login` VALUES ('0201', '0201', '2', '教师');
INSERT INTO `login` VALUES ('1101', '1101', '1', '学生');
INSERT INTO `login` VALUES ('1102', '1102', '1', '学生');
INSERT INTO `login` VALUES ('1103', '1103', '1', '学生');
INSERT INTO `login` VALUES ('1104', '1104', '1', '学生');
INSERT INTO `login` VALUES ('1105', '1105', '1', '学生');
INSERT INTO `login` VALUES ('1106', '1106', '1', '学生');
INSERT INTO `login` VALUES ('1107', '1107', '1', '学生');
INSERT INTO `login` VALUES ('admin', '123', '3', '管理员');

-- ----------------------------
-- Table structure for now
-- ----------------------------
DROP TABLE IF EXISTS `now`;
CREATE TABLE `now`  (
  `cxno` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `currentxq` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`cxno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of now
-- ----------------------------
INSERT INTO `now` VALUES ('1', '2018-2019冬季');

-- ----------------------------
-- Table structure for o
-- ----------------------------
DROP TABLE IF EXISTS `o`;
CREATE TABLE `o`  (
  `xq` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kh` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gh` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sksj` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`kh`, `gh`, `xq`) USING BTREE,
  INDEX `gh`(`gh`) USING BTREE,
  CONSTRAINT `o_ibfk_1` FOREIGN KEY (`kh`) REFERENCES `c` (`kh`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `o_ibfk_2` FOREIGN KEY (`gh`) REFERENCES `t` (`gh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of o
-- ----------------------------
INSERT INTO `o` VALUES ('2018-2019冬季', '08302001', '0201', '星期一5-8');
INSERT INTO `o` VALUES ('2020-2021冬季', '08302001', '0201', '星期一5-8');
INSERT INTO `o` VALUES ('2020-2021冬季', '08305001', '0101', '星期一5-8');
INSERT INTO `o` VALUES ('2018-2019冬季', '08305001', '0102', '星期一5-8');
INSERT INTO `o` VALUES ('2020-2021秋季', '08305001', '0102', '星期一5-8');
INSERT INTO `o` VALUES ('2019-2020秋季', '08305001', '0103', '星期三5-8');
INSERT INTO `o` VALUES ('2018-2019冬季', '08305002', '0101', '星期三1-4');
INSERT INTO `o` VALUES ('2019-2020冬季', '08305002', '0101', '星期三1-4');
INSERT INTO `o` VALUES ('2018-2019冬季', '08305002', '0102', '星期三1-4');
INSERT INTO `o` VALUES ('2019-2020冬季', '08305002', '0102', '星期三1-4');
INSERT INTO `o` VALUES ('2018-2019冬季', '08305002', '0103', '星期三1-4');
INSERT INTO `o` VALUES ('2019-2020冬季', '08305002', '0103', '星期三1-4');
INSERT INTO `o` VALUES ('2018-2019冬季', '08305003', '0102', '星期五5-8');
INSERT INTO `o` VALUES ('2019-2020冬季', '08305003', '0102', '星期五5-8');
INSERT INTO `o` VALUES ('2018-2019冬季', '08305004', '0101', '星期二1-4');
INSERT INTO `o` VALUES ('2020-2021秋季', '08305004', '0101', '星期二1-4');

-- ----------------------------
-- Table structure for s
-- ----------------------------
DROP TABLE IF EXISTS `s`;
CREATE TABLE `s`  (
  `xh` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xm` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `xb` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `csrq` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `jg` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sjhm` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `yxh` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pw` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`xh`) USING BTREE,
  INDEX `yxh`(`yxh`) USING BTREE,
  CONSTRAINT `s_ibfk_1` FOREIGN KEY (`yxh`) REFERENCES `d` (`yxh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s
-- ----------------------------
INSERT INTO `s` VALUES ('1101', '李明', '男', '1993-03-06', '上海', '13613000000', '02', '1101');
INSERT INTO `s` VALUES ('1102', '刘晓明', '男', '1992-12-08', '安徽', '18913000000', '01', '1102');
INSERT INTO `s` VALUES ('1103', '张颖', '女', '1993-01-05', '江苏', '18812312312', '01', '1103');
INSERT INTO `s` VALUES ('1104', '刘晶晶', '女', '1994-11-06', '上海', '13331934111', '01', '1104');
INSERT INTO `s` VALUES ('1105', '刘成刚', '男', '1991-06-07', '上海', '18015000123', '01', '1105');
INSERT INTO `s` VALUES ('1106', '李二丽', '女', '1993-05-04', '江苏', '18101231231', '01', '1106');
INSERT INTO `s` VALUES ('1107', '张晓峰', '男', '1992-08-16', '浙江', '13911231123', '01', '1107');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `scno` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `scorerange` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `score` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`scno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('1', '0~59', '0.0');
INSERT INTO `score` VALUES ('10', '90~100', '4.0');
INSERT INTO `score` VALUES ('2', '60~63', '1.0');
INSERT INTO `score` VALUES ('3', '64~67', '1.5');
INSERT INTO `score` VALUES ('4', '68~71', '2.0');
INSERT INTO `score` VALUES ('5', '72~74', '2.3');
INSERT INTO `score` VALUES ('6', '75~77', '2.7');
INSERT INTO `score` VALUES ('7', '78~81', '3.0');
INSERT INTO `score` VALUES ('8', '82~84', '3.3');
INSERT INTO `score` VALUES ('9', '85~89', '3.7');

-- ----------------------------
-- Table structure for t
-- ----------------------------
DROP TABLE IF EXISTS `t`;
CREATE TABLE `t`  (
  `gh` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xm` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `xb` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `csrq` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `xl` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `jbgz` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `yxh` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pw` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`gh`) USING BTREE,
  INDEX `yxh`(`yxh`) USING BTREE,
  CONSTRAINT `t_ibfk_1` FOREIGN KEY (`yxh`) REFERENCES `d` (`yxh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t
-- ----------------------------
INSERT INTO `t` VALUES ('0101', '陈迪茂', '男', '1973-03-06', '副教授', '13569000011', '01', '0101');
INSERT INTO `t` VALUES ('0102', '刘国栋', '男', '1973-03-06', '副教授', '13613000000', '01', '0102');
INSERT INTO `t` VALUES ('0103', '吴宝钢', '男', '1980-11-06', '讲师', '13255400000', '01', '0103');
INSERT INTO `t` VALUES ('0201', '张心颖', '女', '1976-01-05', '教授', '13420000000', '02', '0201');

SET FOREIGN_KEY_CHECKS = 1;
