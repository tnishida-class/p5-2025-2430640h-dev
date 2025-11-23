// 最終課題を制作しよう
let dummyballs = [];
let v=5;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x1 = 0;
  y1 = height/7;
  x2 = width/2;
  y2 = height*4/5;
  xb = width/2;
  yb = height/2;
  vx1 = 15; //相手ブロックの速さ
  vy1 = 0;
  vx2 = 0;//自分ブロックの速さ
  vy2 = 0;
  vxb = 5; //ボールの速さ
  vyb = 5
}



function draw(){
  background(160, 192, 255);
   fill(255);
    rect (x1,y1,200,50); //相手のブロック
    x1 += vx1;

    if(x1 > windowWidth - 200 || x1 < 0){
      vx1 = -1 * vx1;
    }
    rect (x2,y2,200,50); //自分のブロック
     if(keyIsDown(LEFT_ARROW)){
      x2 -= 15;
    }
     if(keyIsDown(RIGHT_ARROW)){
      x2 +=  15;
    }
     
     ellipse(xb, yb, 50, 50); //ボール
     if(xb <= 0 || xb >= width){ //壁で跳ね返り
       vxb =-1 * vxb;
     }

     xb += vxb;
     yb += vyb; 

     if(ballhit(x1,y1,200,50,xb,yb,25,)){ //ブロックで跳ね返り
       vyb = -vyb;
     }
     if(ballhit(x2,y2,200,50,xb,yb,25)){
       vyb = -vyb;
     }


    if(yb < 0){ //上のゴールに入ったとき
     textSize(120);
     fill(0);
     text("勝利", width/2-100, height/2+40);
     
     noLoop();
    }

    if(yb > height){ //下のゴールに入ったとき
     textSize(120);
     fill(0);
     text("敗北", width/2-100, height/2+40);
     noLoop();
    }

    if(frameCount % 50 === 0) { //50フレームごとにダミーボール生成
      dummyballs. push ({ x: random(width), y: random(y1, y2), vx: random() < 0.5 ? -5 : 5, vy : random() < 0.5 ? -5 : 5});
    }
     
    
    for( let i= 0 ; i< dummyballs.length; i++){ //ダミーボールのアニメーション
      let db = dummyballs[i];
      fill(255);
      ellipse(db.x, db.y, 50, 50);
      if(db.x <= 0 || db.x >= width){ //壁で跳ね返り
       db.vx =-1 * db.vx;
      }

      db.x += db.vx ;
      db.y += db.vy ;
      if(db.x <= 0 || db.x >= width || db.y <= 0 || db.y >= height){ //画面外に出たら消える
        dummyballs.splice(i,1);
      }

      if(ballhit(x1,y1,200,50,db.x,db.y,25)){ //ブロックで跳ね返り
        db.vy = -db.vy;
      }
      if(ballhit(x2,y2,200,50,db.x,db.y,25)){
        db.vy = -db.vy;
      }
    }
    


    fill(0);
    rect(0,0, windowWidth, windowHeight/20); //自分のゴール
    rect(0, windowHeight*19/20, windowWidth, windowHeight/20); //相手のゴール
}

  
    


    
  function ballhit(sx,sy,sw,sh,rx,ry,rs){ //ボールとブロックが衝突するとは
    const closestX = constrain(rx, sx ,sx+sw); //長方形内なら中心、外なら辺
    const closestY = constrain(ry, sy ,sy+sh); 

    const dx= rx - closestX;　//最短距離
    const dy= ry - closestY;  
　　
    const d = dx*dx + dy*dy; //最短距離の二乗

    return d <= rs*rs +rs; //大きさの比較
  }
  
        
  


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  //キャンパスが変わったことでそれぞれも可変になるように
  x1 = width/4;
  y1 = height/7;
  x2 = width/2;
  y2 = height*4/5;
  xb = width/2;
  yb = height/2;
}

