import React from "react";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { SiCss3 } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaPython } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io5";
import { FaFlutter } from "react-icons/fa6";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { SiRaylib } from "react-icons/si";
import { SiUnrealengine } from "react-icons/si";
import { SiGodotengine } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { TbBrandDjango } from "react-icons/tb";
import { SiNumpy } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoAndroid } from "react-icons/io";
import { SiDart } from "react-icons/si";

const icons = {
  react: [<FaReact />, "React"],
  html: [<FaHtml5 />, "Html"],
  css: [<SiCss3 />, "Css"],
  JS: [<IoLogoJavascript />, "JS"],
  python: [<FaPython />, "Python"],
  mongo: [<SiMongodb />, "Mongo"],
  node: [<IoLogoNodejs />, "Node"],
  flutter: [<FaFlutter />, "Flutter"],
  cplusplus: [<BiLogoCPlusPlus />, "C++"],
  raylib: [<SiRaylib />, "Raylib"],
  unreal: [<SiUnrealengine />, "Unreal"],
  java: [<FaJava />, "Java"],
  godot: [<SiGodotengine />, "Godot"],
  sql: [<GrMysql />, "SQL"],
  django: [<TbBrandDjango />, "Django"],
  numpy: [<SiNumpy />, "NumPy"],
  tailwind: [<RiTailwindCssFill />, "Tailwind"],
  android: [<IoLogoAndroid />, "Android"],
  dart: [<SiDart />, "Dart"],
};

export default icons;
