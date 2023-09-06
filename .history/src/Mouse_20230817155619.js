import React, { useState } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

export default function MouseCircle(){
  window.addEventListener("mousemove",function(dets){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  })
}