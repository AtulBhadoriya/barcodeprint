let barvalue = 0;
let printbutton = document.getElementById("printbutton");
let genbutton = document.getElementById("genbutton");
let geninput = document.getElementById("barnumber");
let templates = [];
let perPagecount = 0;



//loadrecent('recent');

//list of page sizes
var sizes = [
  {
    size: "A3",
  },
  {
    size: "A4",
  },
  {
    size: "A5",
  },
  {
    size: "A6",
  },
  {
    size: "12X18 inch",
  },
  {
    size: "13X19 inch",
  },
  {
    size: "7.5X10 inch",
  },
  {
    size: "Letter",
  }
];
removeOptions(document.getElementById("page_size"));

//append default list to select
sizes.forEach((size) => {
  var option = document.createElement("option");

  option.text = size.size;
  option.id = size.size;
  option.value = size.size;
  if (size.size == "A4") {
    option.selected = true;
  }
  var select = document.getElementById("page_size");
  select.appendChild(option);
});

//get barcode value
function getbarvalue(value) {
  
  if (value != "") {
    barvalue = value;
    printbutton.style.display = "flex";
    genbutton.style.display = "none";
    geninput.style.display = "none";
    var hid = document.getElementById("hidden");
    hid.style.display = "block";
    hid.innerText = barvalue;
    barGenrator();
  } else {
    alert("Barcode Maxcount must not be empty");
  }
}

//random key gnerator
function generate(n) {
  var add = 1,
    max = 12 - add;
  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

//genrate barcode and initiate draggable

function barGenrator() {
  var printabl = document.getElementById("printableArea");

  for (let i = 0; i < barvalue; i++) {
    var div = document.createElement("div");
    var img = document.createElement("img");
    div.id = "moj";
    img.className = "alignnone size-medium wp-image-8 barcode";
    div.append(img);
    printabl.append(div);
  }
  var element = document.getElementsByClassName("barcode");
  var startswith = document.getElementById("startswith");
  startswith.style.display = "none";
  var hid2 = document.getElementById("hidden1");
  hid2.innerText = startswith.value;
  hid2.style.display = "block";

  let color = document.getElementById("color").value;
  let fontsize = document.getElementById("fontsize").value;
  let items = Array.from(element);
  let oldvalue = 0;
  let barwidth = document.getElementById("barwidth");
  let barheight = document.getElementById("barheight");
  if (barvalue != "" && startswith.value != "") {
    items.forEach((child) => {
      if (oldvalue != 0) {
        let value = +oldvalue + 1;
        oldvalue = value.toString();
        if (value != null) {
          JsBarcode(child, "RD"+value+"IN", {
            lineColor: color !== undefined ? color : '#000',
            fontSize:fontsize !== undefined ? +fontsize : 10,
            width: barwidth.value,
            height: barheight.value,
            displayValue: true,
          });
        } else {
          JsBarcode(child, "123456789012", {
            format: "upc",
            lineColor: color !== undefined ? color : '#000',
             fontSize:fontsize !== undefined ? +fontsize : 10,
            width: barwidth.value,
            height: barheight.value,
            displayValue: true,
          });
        }
      } else {
       
        let value = generate(startswith.value -4);
        oldvalue = value;
        if (value != null) {
          JsBarcode(child, "RD"+value+"IN", {
            lineColor: color !== undefined ? color : '#000',
            fontSize:fontsize !== undefined ? +fontsize : 10,
            width: barwidth.value,
            height: barheight.value,
            displayValue: true,
          });
        } else {
          JsBarcode(child, "123456789012", {
            format: "upc",
            lineColor: color !== undefined ? color : '#000',
            fontSize:fontsize !== undefined ? +fontsize : 10,
            width: barwidth.value,
            height: barheight.value,
            displayValue: true,
          });
        }
      }
    });
    saverecent('recent');

    //saverecent('recent');

    init();
  } else {
    printbutton.style.display = "none";
    genbutton.style.display = "flex";
    geninput.style.display = "flex";
    var hid = document.getElementById("hidden");
    hid.style.display = "none";
    var startswith = document.getElementById("startswith");
    startswith.style.display = "flex";
    var hid2 = document.getElementById("hidden1");
    // hid2.innerText = startswith.value;
    hid2.style.display = "none";
    alert("Baercode starts with must not be empty!");
  }
}

//print div
function printDiv(divName) {

  if (divName.innerHTML != undefined || divName.innerHTML != null) {
  
    
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    //window.location.reload();
    document.body.innerHTML = originalContents;
   
    init();
  } else {
   
    var printContents = document.getElementById("primeDiv").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    // window.location.reload();
    document.body.innerHTML = originalContents;
    
    init();
  }
}

//remove select options
function removeOptions(selectElement) {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i + 1);
  }
}
let pagetype;
let pagesize;

//change page type
function page_type() {
  pagetype = document.getElementById("page_type").value;
  var print = document.getElementById("printableArea");
  if (pagetype == "landscape") {
    print.style.height = "595px";
    print.style.width = "842px";
  } else {
    print.style.width = "595px";
    print.style.height = "842px";
  }
  let options = document.getElementById("A4");
  options.selected = true;
}
//change page size
function page_size() {
  pagetype = document.getElementById("page_type").value;
  pagesize = document.getElementById("page_size").value;
  var print = document.getElementById("printableArea");
  if (pagetype == "landscape") {
    switch (pagesize) {
      case "A3":
        print.style.height = "842px";
        print.style.width = "1191px";
        break;
      case "A4":
        print.style.height = "595px";
        print.style.width = "842px";
        break;
      case "A5":
        print.style.height = "420px";
        print.style.width = "595px";
        break;
      case "A6":
        print.style.height = "298px";
        print.style.width = "420px";
        break;
      case "12X18 inch":
        print.style.height = "1152px";
        print.style.width = "1728px";
        break;
      case "13X19 inch":
        print.style.height = "1248px";
        print.style.width = "1824px";
        break;
      case "7.5X10 inch":
        print.style.height = "720px";
        print.style.width = "960px";
        break;
      case "Letter":
        print.style.height = "612px";
        print.style.width = "791px";
        break;
      default:
        print.style.height = "595px";
        print.style.width = "842px";
    }
  } else {
    switch (pagesize) {
      case "A3":
        print.style.width = "842px";
        print.style.height = "1191px";
        break;
      case "A4":
        print.style.width = "595px";
        print.style.height = "842px";
        break;
      case "A5":
        print.style.width = "420px";
        print.style.height = "595px";
        break;
      case "A6":
        print.style.width = "298px";
        print.style.height = "420px";
        break;
      case "12X18 inch":
        print.style.width = "1152px";
        print.style.height = "1728px";
        break;
      case "13X19 inch":
        print.style.width = "1248px";
        print.style.height = "1824px";
        break;
      case "7.5X10 inch":
        print.style.width = "720px";
        print.style.height = "960px";
        break;
      case "Letter":
        print.style.width = "612px";
        print.style.height = "791px";
        break;
      default:
        print.style.width = "595px";
        print.style.height = "842px";
    }
  }
}
// initiate draggable function
function init() {
  if ("ontouchstart" in window) {
    window.addEventListener("load", glavna_funkcija);

    function glavna_funkcija() {
      imgs = document.getElementsByTagName("img");

      let t = 10;
      let naziv_diva = "";
      for (img of imgs) {
        naziv_diva = "alignnone size-medium wp-image-" + [t];
        img.id = naziv_diva;

        document
          .getElementById(img.id)
          .addEventListener("touchstart", dotaknut_ekran);
        img.style.position = "relative";
        t--;
      }
      let povrsina = document.getElementById("primeDiv");
      povrsina.addEventListener("touchmove", pomeranje_po_ekranu);
      povrsina.addEventListener("touchend", kraj_dodira);

      var the_moving_div;
      the_last_mouse_positionX;
      the_last_mouse_positionY;

      function dotaknut_ekran(ev) {
        ev.preventDefault();
        the_moving_div = ev.target.id;
        the_last_mouse_positionX = ev.touches[0].clientX;
        the_last_mouse_positionY = ev.touches[0].clientY;

        for (img of imgs) {
          if (img.style.zIndex > ev.target.style.zIndex) {
            img.style.zIndex = img.style.zIndex - 1;
          }
        }

        ev.target.style.zIndex = imgs.length;

        let pomeri = ev.target.getBoundingClientRect();

        if (pomeri.top < 20) {
          window.scrollBy(0, -10);
        }

        if (pomeri.top + ev.target.offsetHeight + 150 > screen.height) {
          window.scrollBy(0, 10);
        }
      }

      function pomeranje_po_ekranu(ev) {
        if (the_moving_div == "") return;
        var d = document.getElementById(the_moving_div);
        d.style.left =
          d.offsetLeft +
          ev.touches[0].clientX -
          the_last_mouse_positionX +
          "px";
        d.style.top =
          d.offsetTop + ev.touches[0].clientY - the_last_mouse_positionY + "px";

        the_last_mouse_positionX = ev.touches[0].clientX;
        the_last_mouse_positionY = ev.touches[0].clientY;

        let pomeri = d.getBoundingClientRect();

        if (pomeri.top < 10) {
          window.scrollBy(0, -20);
        }
        if (screen.height - pomeri.bottom < 50) {
          window.scrollBy(
            0,
            d.offsetLeft + ev.touches[0].clientX - the_last_mouse_positionX
          );
        }
      }

      function kraj_dodira(ev) {
        if (the_moving_div == "") return;
        document.getElementById(the_moving_div).style.border = "none";
        the_moving_div = "";
      }
    }
  } else {
    imgs = document.getElementsByTagName("img");

    let t = 10;

    let naziv_diva = "";
    for (img of imgs) {
      naziv_diva = "alignnone size-medium wp-image-" + [t];
      img.id = naziv_diva;

      document.getElementById(img.id).onmousedown = onMouseDown;

      t--;
    }

    let i = 0;

    let niz = [];
    for (img of imgs) {
      niz.push(img.offsetTop + "px");
      niz.push(img.offsetLeft + "px");
      niz.push(img.getBoundingClientRect().top + "px");
      niz.push(img.getBoundingClientRect().left + "px");
      img.style.cursor = "grab";
      img.style.position = "relative";
      i++;
    }
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    var the_moving_div = "";
    var the_last_mouse_position = { x: 0, y: 0 };

    function onMouseDown(e) {
      e.preventDefault();
      the_moving_div = e.target.id; // remember which div has been selected
      the_last_mouse_position.x = e.clientX; // remember where the mouse was when it was clicked
      the_last_mouse_position.y = e.clientY;

      for (img of imgs) {
        if (img.style.zIndex > e.target.style.zIndex) {
          img.style.zIndex = img.style.zIndex - 1;
        }
      }

      e.target.style.zIndex = imgs.length;
    }

    function onMouseMove(e) {
      e.preventDefault();
      if (the_moving_div == "") return;
      var d = document.getElementById(the_moving_div);
      d.style.left =
        d.offsetLeft + e.clientX - the_last_mouse_position.x + "px"; // move the div by however much the mouse moved
      d.style.top = d.offsetTop + e.clientY - the_last_mouse_position.y + "px";
      the_last_mouse_position.x = e.clientX; // remember where the mouse is now
      the_last_mouse_position.y = e.clientY;
    }

    function onMouseUp(e) {
      e.preventDefault();
      if (the_moving_div == "") return;
      document.getElementById(the_moving_div).style.border = "none"; // hide the border again
      the_moving_div = "";
    }
  }
}
let open = 0;

function sidnav() {
  let saveOption = document.getElementById("saveOption");
  let saveButton = document.getElementById("savebutton");
  if (open == 0) {
    open = 1;
    saveOption.style.width = "30%";
    saveButton.innerHTML = "close";
    ReadCookie();
    if (templates.isNotEmpty || templates.length >= 1) {
      Array.from(templates).forEach((child) => {
        var option = document.createElement("option");
        if (child.key != "") {
          option.text = child.key;
          option.id = child.key;
          option.value = child.key;
        } else {
          option.text = "No Templates";
          option.id = "no";
          option.value = "no";
        }

        var select = document.getElementById("template_key");
        select.appendChild(option);
      });
      setTimeout(() => {
        $("#saveOption").css("padding", "40px");
        $("#template_load").css("display", "flex");
        $("#template_save").css("display", "flex");
        $("#template_head").css("display", "flex");
        $("#newtemplate").css("display", "flex");
        $("#savebutton").css("display", "none");
        $("#closebutton").css("display", "flex");
        $('#export_save').css("display","flex");
        $('#exportbutton').css("display","flex");
         $("#export_head").css("display","flex");

      }, 500);
    } else {
      setTimeout(() => {
        $("#saveOption").css("padding", "40px");
        $("#template_load").css("display", "none");
        $("#template_save").css("display", "flex");
        $("#template_head").css("display", "flex");
        $("#newtemplate").css("display", "flex");
        $("#savebutton").css("display", "none");
        $("#closebutton").css("display", "flex");
        $('#export_save').css("display","none");
        $('#exportbutton').css("display","none");
        $("#export_head").css("display","none");
      }, 500);
    }
  } else {
    open = 0;
    saveOption.style.width = "0px";
    saveButton.innerHTML = "Save/Load";

    // setTimeout(() => {
    $("#saveOption").css("padding", "0px");
    $("#template_load").css("display", "none");
    $("#template_save").css("display", "none");
    $("#template_head").css("display", "none");
    $("#newtemplate").css("display", "none");
    $("#savebutton").css("display", "flex");
    $('#export_save').css("display","none");
        $('#exportbutton').css("display","none");
        $("#export_head").css("display","none");
    $("#closebutton").css("display", "none");
    // }, 500);
  }
}

//Read all the Available cookies
function ReadCookie() {
  var allcookies = document.cookie;

  cookiearray = allcookies.split(";");

  // Now take key value pair out of this array
  for (var i = 0; i < cookiearray.length; i++) {
    name = cookiearray[i].split("=")[0];
    value = cookiearray[i].split("=")[1];
    templates.push({ key: name.trim() });
  }
}

//Save cookie

function savecookie(key) {
  let pagetype = document.getElementById("page_type").value;
  let pagesize = document.getElementById("page_size").value;
  let barnumber = document.getElementById("barnumber").value;
  let startswith = document.getElementById("startswith").value;
  let printable = document.getElementById("primeDiv").innerHTML;
  let color = document.getElementById("color").value;
  let fontsize = document.getElementById("fontsize").value;
  let barwidth = document.getElementById("barwidth").value;
  let barheight = document.getElementById("barheight").value;
  $.cookie.json = true;
  let cookie = $.cookie(key.toString());
  if (key != "" && hasWhiteSpace(key) == false) {
    if (cookie === undefined) {
      $.cookie(key.trim().toString(), {
        pagetype: pagetype,
        pagesize: pagesize,
        no_of_barcode: barnumber,
        starts_with: startswith,
        color:color,
        fontsize:fontsize,
        barwidth:barwidth,
        barheight:barheight,
      });

      localStorage.setItem(key, printable);
      alert("Template Saved Successfully");
    } else {
      alert("Template Already Exist");
    }
  } else {
    if (key == "") {
      alert("Template name can not be empty");
    } else {
      alert("Template name can not contain empty spaces");
    }
  }
}

//check and load cookie

function checkCookies(key) {
  let cookie = $.cookie(key.toString());

  if (cookie) {
    let loadData = JSON.parse(cookie);
    document.getElementById(loadData.pagetype).selected = true;
    document.getElementById(loadData.pagesize).selected = true;
  document.getElementById("color").value = loadData.color;
  document.getElementById("fontsize").value= loadData.fontsize;
  document.getElementById("barwidth").value= loadData.barwidth;
  document.getElementById("barheight").value= loadData.barheight;
    page_size();
    if (loadData.no_of_barcode != "") {
      genbutton.style.display = "none";
      geninput.style.display = "none";
      var hid = document.getElementById("hidden");
      var printButton = document.getElementById("printbutton");
      printButton.style.display = "block";
      hid.style.display = "block";
      hid.innerText = loadData.no_of_barcode;
      document.getElementById("barnumber").value = loadData.no_of_barcode;
      if (loadData.starts_with != "") {
        var startswith = document.getElementById("startswith");
        startswith.value = loadData.starts_with;
        startswith.style.display = "none";
        var hid2 = document.getElementById("hidden1");
        hid2.innerText = loadData.starts_with;
        hid2.style.display = "block";
        let div = localStorage.getItem(key.toString());
        // console.log(typeof div);
        // console.log(div.length);
        if (typeof div !== "undefined" && div !== null && div.length > 9) {
          document.getElementById("primeDiv").innerHTML = div;
          init();
        } else {
          getbarvalue(loadData.no_of_barcode);
        }
      }
    }
  } else {
    console.log("No saved data");
  }
}

// new Template
function newTemplate() {
  document.getElementById("printableArea").innerHTML = "";
  printbutton.style.display = "none";
  genbutton.style.display = "flex";
  geninput.style.display = "flex";
  geninput.value = "";
  var startswith = document.getElementById("startswith");
  startswith.value = "";
  startswith.style.display = "flex";
  var hid = document.getElementById("hidden");
  hid.style.display = "none";
  var hid1 = document.getElementById("hidden1");
  hid1.style.display = "none";
}

function hasWhiteSpace(value) {
  return /^$|\s+/.test(value);
}

//upload excel
var ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;

      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        localStorage.setItem("barcode_list", json_object);
        let decodedjason = JSON.parse(json_object);
        //console.log(json_object);

        alert("File Uploaded Successfully");
        genrateMultipleBarDiv(decodedjason);
        // xlBargenrator(decodedjason);
      });
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  //console.log('clicked');

  var files = evt.target.files; // FileList object
  if (files[0].name == "barcode.xlsx" || files[0].name == "barcode.xls") {
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
    // console.log(files[0].name);
  } else {
    alert(
      "Incorrect filename!\nFile name should be barcode.xlsx or barcode.xlx"
    );
  }
}
function onUploadHandler(ev) {
  ev.preventDefault();
  if(document.getElementById("printableArea")!== null){
    if (document.getElementById("printableArea").innerHTML.length < 2) {
    alert("Please set a demo template first!!! ");
  } else {
    //let tempPage = prompt("Enter Barcode count per page!");
    //if (tempPage != null) {
    perPagecount = document.getElementById("barnumber").value;
    var el = (window._protected_reference = document.createElement("INPUT"));
    el.type = "file";
    el.id = "upload";
    el.name = "file[]";
    el.addEventListener("change", handleFileSelect, false);
    el.click();
  }
}else{
  alert("Inavlid Sample Template");
}
  
  // }
}


//bulkbarcodegenrator

function xlBargenrator(list) {
  var printabl = document.getElementById("printableArea");
  for (let i = 0; i < list.length; i++) {
    var div = document.createElement("div");
    var img = document.createElement("img");
    div.id = "moj";
    img.className = "alignnone size-medium wp-image-8 barcode";
    div.append(img);
    printabl.append(div);
  }
  var element = document.getElementsByClassName("barcode");
  var startswith = document.getElementById("startswith");
  let bardiv = document.getElementById("barnumber");
  bardiv.value = list.length;
  bardiv.style.display = "none";
  let barhid = document.getElementById("hidden");
  barhid.style.display = "block";
  barhid.innerText = list.length;
  startswith.value = list[0].bar_numbers;
  barvalue = list.length;
  startswith.style.display = "none";
  var hid2 = document.getElementById("hidden1");
  hid2.innerText = startswith.value;
  hid2.style.display = "block";
  let items = Array.from(element);
  let oldvalue = 0;
  let color = document.getElementById("color").value;
  let fontsize = document.getElementById("fontsize").value;
  let barwidth = document.getElementById("barwidth");
  let barheight = document.getElementById("barheight");
  if (barvalue != "" && startswith.value != "") {
    let i = 0;
    items.forEach((child) => {
      JsBarcode(child, list[i].bar_numbers, {
        lineColor: color !== undefined ? color : '#000',
        fontSize:fontsize !== undefined ? +fontsize : 10,
        width: barwidth.value,
        height: barheight.value,
        displayValue: true,
      });
      i++;
    });
    init();
  } else {
    printbutton.style.display = "none";
    genbutton.style.display = "flex";
    geninput.style.display = "flex";
    var hid = document.getElementById("hidden");
    hid.style.display = "none";
    var startswith = document.getElementById("startswith");
    startswith.style.display = "flex";
    var hid2 = document.getElementById("hidden1");
    hid2.style.display = "none";
    alert("Baercode starts with must not be empty!");
  }
}


// Export Excel

function excelexport() {
 var startvalue = document.getElementById('start_key').value;
 var midvalue = document.getElementById('mid_key').value;
 var endvalue = document.getElementById('end_key').value;
 var totalcount = document.getElementById('count_key').value;


let codes = [];
let prev= 0;
let value = +midvalue;
if(value !== '' || value !== undefined || value !== NaN){
  for (var i = 0; i < totalcount; i++) {

codes.push({'bar_numbers': startvalue+value+endvalue});
value = value+1;
 }
 var myFile = "barcode.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(codes);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "barcode");
  XLSX.writeFile(myWorkBook, myFile);
}else{
  alert('Mid Value is invalid');
}
 
}

function genrateMultipleBarDiv(file) {
  let maxsampple_bar = document.getElementById("barnumber").value;
  let printContents = document.getElementById("printableArea");


  let color = document.getElementById("color").value;
  let fontsize = document.getElementById("fontsize").value;

  let prime = document.getElementById("primeDiv");
  let dw = printContents.style.width;
  let dh = printContents.style.height;
  prime.style.width = "auto";
  let innerContent = printContents.innerHTML;
  if (maxsampple_bar < perPagecount) {
    alert("Sample template max value does not match page count!!");
  } else {
    prime.innerHTML = "";
    var totalpages = file.length / perPagecount;
    totalpages = Math.ceil(totalpages);
    let last = 0;
    for (var x = 0; x < totalpages; x++) {
      let printArea = document.createElement("div");
      printArea.className = "printableArea";
      printArea.style.width = dw;
      printArea.style.height = dh;
      printArea.style.border = "1px solid red";
      printArea.style.pageBreakAfter = "always";
      printArea.innerHTML = innerContent;
      prime.appendChild(printArea);
      let temp = 0;
      for (var j = last; j < file.length; j++) {
        if (temp == perPagecount) {
          last = j;
          console.log("break");
          temp = 0;
          break;
        } else {
          temp++;
        }
      }
    }
  }
  var element = document.getElementsByClassName("barcode");
  let items = Array.from(element);
  let i = 0;
  items.forEach((child) => {
    if (file[i] !== undefined) {
      JsBarcode(child, file[i].bar_numbers, {
        lineColor: color !== undefined ? color : '#000',
        fontSize:fontsize !== undefined ? +fontsize : 10,
        width: barwidth.value,
        height: barheight.value,
        displayValue: true,
      });
    } else {
      child.style.display = "none";
    }

    i++;
  });

  init();
}




function saverecent(key) {
  let cookie = $.cookie(key.toString());
   if (cookie) {
    //$cookie.remove();
    $.cookie(key.toString(), null);
$.removeCookie(key.toString());
  let pagetype = document.getElementById("page_type").value;
  let pagesize = document.getElementById("page_size").value;
  let barnumber = document.getElementById("barnumber").value;
  let startswith = document.getElementById("startswith").value;
  let printable = document.getElementById("primeDiv").innerHTML;
   let color = document.getElementById("color").value;
  let fontsize = document.getElementById("fontsize").value;
  let barwidth = document.getElementById("barwidth").value;
  let barheight = document.getElementById("barheight").value;
  $.cookie.json = true;
  $.cookie.json = true;
  let cookie = $.cookie(key.toString());
  if (key != "" && hasWhiteSpace(key) == false) {
    if (cookie === undefined) {
      $.cookie(key.trim().toString(), {
        pagetype: pagetype,
        pagesize: pagesize,
        no_of_barcode: barnumber,
        starts_with: startswith,
        color:color,
        fontsize:fontsize,
        barwidth:barwidth,
        barheight:barheight,
      });

      localStorage.setItem(key, printable);
      console.log("Template Saved Successfully");
    } else {
      console.log("Template Already Exist");
    }
  } else {
    if (key == "") {
      console.log("Template name can not be empty");
    } else {
      console.log("Template name can not contain empty spaces");
    }
  }

   }else{
    let pagetype = document.getElementById("page_type").value;
  let pagesize = document.getElementById("page_size").value;
  let barnumber = document.getElementById("barnumber").value;
  let startswith = document.getElementById("startswith").value;
  let printable = document.getElementById("primeDiv").innerHTML;
   let color = document.getElementById("color").value;
  let fontsize = document.getElementById("fontsize").value;
  let barwidth = document.getElementById("barwidth").value;
  let barheight = document.getElementById("barheight").value;
  $.cookie.json = true;
  let cookie = $.cookie(key.toString());
  if (key != "" && hasWhiteSpace(key) == false) {
    if (cookie === undefined) {
      $.cookie(key.trim().toString(), {
        pagetype: pagetype,
        pagesize: pagesize,
        no_of_barcode: barnumber,
        starts_with: startswith,
        color:color,
        fontsize:fontsize,
        barwidth:barwidth,
        barheight:barheight,
      });

      localStorage.setItem(key, printable);
      console.log("Template Saved Successfully");
    } else {
      console.log("Template Already Exist");
    }
  } else {
    if (key == "") {
      console.log("Template name can not be empty");
    } else {
      console.log("Template name can not contain empty spaces");
    }
  }
   }
  
}



function loadrecent(key){
   let cookie = $.cookie(key.toString());

  if (cookie) {
    let loadData = JSON.parse(cookie);
    document.getElementById(loadData.pagetype).selected = true;
    document.getElementById(loadData.pagesize).selected = true;
     document.getElementById("color").value = loadData.color;
    document.getElementById("fontsize").value= loadData.fontsize;
    document.getElementById("barwidth").value= loadData.barwidth;
    document.getElementById("barheight").value= loadData.barheight;
    page_size();
    if (loadData.no_of_barcode != "") {

      genbutton.style.display = "none";
      geninput.style.display = "none";
      var hid = document.getElementById("hidden");
      var printButton = document.getElementById("printbutton");
      printButton.style.display = "block";
      hid.style.display = "block";
      hid.innerText = loadData.no_of_barcode;
      document.getElementById("barnumber").value = loadData.no_of_barcode;
      if (loadData.starts_with != "") {

        var startswith = document.getElementById("startswith");
        startswith.value = loadData.starts_with;
        startswith.style.display = "none";
        var hid2 = document.getElementById("hidden1");
        hid2.innerText = loadData.starts_with;
        hid2.style.display = "none";
        let div = localStorage.getItem(key.toString());
        // console.log(typeof div);
        // console.log(div.length);
        if (typeof div !== "undefined" && div !== null && div.length > 9) {
          
          document.getElementById("primeDiv").innerHTML = div;
          init();
        } else {
          getbarvalue(loadData.no_of_barcode);
        }
      }
    }
  } else {
    console.log("No saved data");
  }
  init();
}