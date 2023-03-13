<template>
  <div>hello world</div>
</template>

<script>
export default {
  unmounted() {
    /**
     *
     * 抽奖轮盘实现 v1.0.0
     * 基本特性:
     *  抽奖重置、停在生成的目标奖项位置
     * 难点:
     *  1.抽奖的速度函数的处理
     *  思路:
     *   最后一圈均减速以提升体验
     *
     *  2.抽奖结果的停留
     *  思路:
     *   将状态维度细分到转动的步数，最后一圈的情况下，移动目标步后停止 done
     */
    let activeIdx = 1;
    let timer;
    let drawPanEle = document.querySelector(".drawPan_content");
    let drawBtnEle = document.querySelector(".btn-startDraw");
    let crtRunTimes = 0;
    let isPLaying = false;
    let speed = 100;
    let stepCount = 0;
    let resultIdx = -1;
    const MAX_RUN_TIMES = 3;

    function startDraw() {
      isPLaying = true;
      timer = setInterval(() => {
        activeIdx++;
        stepCount++;
        if (activeIdx == 9) {
          activeIdx = 1;
          crtRunTimes++;
        }
        if (crtRunTimes == MAX_RUN_TIMES) {
          resultIdx = getDrawResult();
          console.log("获取了抽奖结果", resultIdx);
        }
        if (stepCount > 8 * MAX_RUN_TIMES) {
          speed += 100;
        }
        if (stepCount - 8 * MAX_RUN_TIMES == resultIdx && resultIdx !== -1) {
          clearInterval(timer);
          isPLaying = false;
          console.log("steps", stepCount);
        }
        drawPanEle.className = "drawPan_content active-" + activeIdx;
      }, speed);
    }

    /**
     * 获得范围为1到8之间的正整数
     * @returns
     */
    function getDrawResult() {
      return Math.round(Math.random() * 7) + 1;
    }

    function resetDraw() {
      activeIdx = 1;
      crtRunTimes = 0;
      isPLaying = false;
      stepCount = 0;
      resultIdx = -2;
    }

    function bindEvents() {
      drawBtnEle.addEventListener("click", function () {
        if (isPLaying) {
          return;
        }
        resetDraw();
        startDraw();
      });
    }

    function main() {
      bindEvents();
    }

    main();
  },
};
</script>

<style>
</style>