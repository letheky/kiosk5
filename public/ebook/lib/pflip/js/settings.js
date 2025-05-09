var option_PDFF = {

    /* BASIC SETTINGS */
    openPage: 1,
    // height: '50%',
    width: '50%',
    enableSound: true,
    downloadEnable: true,
    direction: pdfflip.DIRECTION.LTR,
    autoPlay: true,
    autoPlayStart: false,
    autoPlayDuration: 3000,
    autoEnableOutline: false,
    autoEnableThumbnail: false,


    /* TRANSLATE INTERFACE */

    text: {
        toggleSound: "Sound",
        toggleThumbnails: "Thumbnails",
        toggleOutline: "Contents",
        previousPage: "Previous Page",
        nextPage: "Next Page",
        toggleFullscreen: "Fullscreen",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        downloadPDFFile: "Download PDF",
        gotoFirstPage: "First Page",
        gotoLastPage: "Last Page",
        play: "AutoPlay On",
        pause: "AutoPlay Off",
        share: "Share"
    },

    /* ADVANCED SETTINGS */

    hard: "",
    overwritePDFOutline: false,
    duration: 1000,
    pageMode: pdfflip.PAGE_MODE.DOUBLE,
    singlePageMode: pdfflip.SINGLE_PAGE_MODE.BOOKLET,
    transparent: false,
    scrollWheel: true,
    zoomRatio: 1.5,
    maxTextureSize: 1600,
    // backgroundImage: "assets/bg_text1.jpg",
    // backgroundImage: "assets/bookshelf_skin01_background.png",
    backgroundColor: "#fff",
    controlsPosition: pdfflip.CONTROLSPOSITION.BOTTOM,
    allControls: "altPrev,pageNumber,altNext",
    // allControls: "thumbnail,play,altPrev,pageNumber,altNext,zoomIn,zoomOut,fullScreen",
    hideControls: "outline,startPage,endPage,download,sound,share",

};

var pdfflipLocation = "./lib/pflip/";