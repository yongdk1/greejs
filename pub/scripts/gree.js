"use strict";
console.log("----------");
console.log("SCRIPT: Creating and loading our JS libraries");

(function (global, document, $) {
  // pedigreetree function
  function PedigreeTree(id) {
    // used to identify graph uniquely on page
    this.id = id;
    
    // graph options
    this.graphheight = "auto";
    this.graphwidth = "100%";
    this.scaling = true;
    this.scalingType = null;
    this.clickdrag = false;
    this.multiOpen = false;

    // card options
    this.cardheight = 105;
    this.cardwidth = 250;
    this.cardcolor = "floralwhite";
    this.cardfontSize = 16;
    this.hover = false;
  }

  /* Private properties and functions */
  // unless we attach these to the global window object, they cannot be accessed directly.
  // they will only be in the closure of this function, and can be accessed only the places we use them

  // tree ordering algorithm
  function _preprocess(persons) {
    // find number of levels
    const levels = [];
    persons.map((person) => {
      if (!levels.includes(person.level)) {
        levels.push(person.level);
      }
    });
    levels.sort((a, b) => a - b);
    // console.log(levels)

    // place nodes into array of levels
    const leveledNodes = [];
    levels.map((level) => {
      const onLevel = persons.filter((person) => {
        return person.level === level;
      });
      leveledNodes.push(onLevel);
    });
    // console.log(leveledNodes)

    // find broadest level - rest of graph will be defined according to this level
    let breadth = 0;
    let height = 0;
    leveledNodes.map((level, index) => {
      if (level.length > breadth) {
        breadth = level.length;
        height = index;
      }
    });
    const broadestLevel = leveledNodes.slice(height, height + 1)[0];
    const aboveNodes = leveledNodes.slice(0, height);
    const belowNodes = leveledNodes.slice(height + 1);

    // console.log("below nodes", belowNodes)

    // sort the broadest level
    // prioritize keeping partners together
    // followed by keeping siblings together
    const broadestLevelSorted = [];
    broadestLevel.map((person) => {
      if (!broadestLevelSorted.includes(person)) {
        const siblings = _findSiblings(person, broadestLevel);
        const partnerUp = _findPartners(siblings, broadestLevel);
        partnerUp.map((pair) => {
          pair.map((person) => {
            broadestLevelSorted.push(person);
          });
        });
      }
    });
    // console.log("Sorted broadest level:", broadestLevelSorted)

    // sort nodes above (i.e. ancestors)
    aboveNodes.push(broadestLevelSorted);
    const parentof = {};
    let neworder = [];
    neworder.push(aboveNodes.slice(-1)[0].map((person) => person.id));
    aboveNodes
      .slice()
      .reverse()
      .forEach((level) => {
        const plevel = [];
        level.map((person) => {
          if (!neworder.slice(-1)[0].includes(person.id)) {
            neworder[neworder.length - 1].push(person.id);
          }
          if (person.parent1 && !plevel.includes(person.parent1)) {
            plevel.push(person.parent1);
          }
          if (person.parent2 && !plevel.includes(person.parent2)) {
            plevel.push(person.parent2);
          }
          if (person.parent1) {
            parentof[person.parent1] = parentof[person.parent1] || [];
            parentof[person.parent1].push(person.id);
          }
          if (person.parent2) {
            parentof[person.parent2] = parentof[person.parent2] || [];
            parentof[person.parent2].push(person.id);
          }
        });
        if (plevel.length) neworder.push(plevel);
      });
    const reversedneworder = neworder.slice().reverse();

    // console.log("Above Sorted", reversedneworder)

    // sort nodes below (i.e. descendants)
    const childof = {};
    neworder = [];
    let parentlevel = broadestLevelSorted.map((person) => person.id);
    belowNodes.map((level) => {
      const order = [];
      // order nodes with parents
      level.map((person) => {
        if (person.parent1) {
          childof[person.id] = childof[person.id] || [];
          childof[person.id].push(person.parent1);
          if (person.parent2) {
            childof[person.id] = childof[person.id] || [];
            childof[person.id].push(person.parent2);
          }
          // place children in order of parents
          const parentindex = parentlevel.indexOf(person.parent1);
          if (!order.includes([person, parentindex])) {
            let desiredPos = order.length;
            order.map((pair, index) => {
              if (parentindex < pair[1]) {
                desiredPos = Math.min(index, desiredPos);
              }
            });
            const pair = _findPartners([person], level)[0];
            pair
              .slice()
              .reverse()
              .map((person) => {
                order.splice(desiredPos, 0, [person, parentindex]);
              });
          }
        }
      });
      let orderPersons = order.map((pair) => pair[0]);
      orderPersons = [...new Set(orderPersons)];

      // console.log(orderPersons)

      // order nodes without parents
      level.map((person) => {
        if (!orderPersons.includes(person)) {
          const pair = _findPartners([person], level)[0];
          pair.map((person) => {
            orderPersons.push(person);
          });
        }
      });
      parentlevel = orderPersons.map((person) => person.id);
      neworder.push(parentlevel);
    });

    // console.log(neworder)

    neworder = reversedneworder.concat(neworder);

    const orderedNodes = [];
    neworder.forEach((level) => {
      const objlevel = [];
      level.map((id) => {
        objlevel.push(persons.filter((person) => person.id === id)[0]);
      });
      orderedNodes.push(objlevel);
    });

    // console.log(orderedNodes)

    return [orderedNodes, parentof, childof];
  }

  // helper functions for algorithm
  function _findSiblings(person, level) {
    let siblings = null;
    if (person.parent1 && person.parent2) {
      const parent1 = person.parent1;
      const parent2 = person.parent2;
      siblings = level.filter((person) => {
        return person.parent1 === parent1 || person.parent2 === parent2;
      });
    } else if (person.parent1) {
      const parent1 = person.parent1;
      siblings = level.filter((person) => {
        return person.parent1 === parent1;
      });
    } else {
      siblings = [person];
    }
    return siblings;
  }

  function _findPartners(persons, level) {
    if (persons === null) {
      return;
    }
    const pairs = [];
    persons.map((person) => {
      const pair = [person];
      if (person.partner) {
        const partnerid = person.partner;
        const partner = level.filter((person) => {
          return person.id === partnerid;
        })[0];
        if (person.gender === "male") {
          pair.push(partner);
        } else {
          pair.unshift(partner);
        }
      }
      pairs.push(pair);
    });

    return pairs;
  }

  // tree drawing functions
  function _applyOffsets(preprocessed, id) {
    // find broadest level
    const leveledNodes = preprocessed[0];
    const parentof = preprocessed[1];
    const childof = preprocessed[2];

    let breadth = 0;
    let height = 0;
    leveledNodes.map((level, index) => {
      if (level.length > breadth) {
        breadth = level.length;
        height = index;
      }
    });

    // set ancestor offsets
    leveledNodes
      .slice(0, height + 1)
      .reverse()
      .map((level) => {
        level.map((person) => {
          if (person.id in parentof) {
            // get midpoint of children
            let xpos = 0;
            parentof[person.id].map((child) => {
              const childid = "#" + id + "person" + child;
              const childPlace = $(childid);
              const x1 =
                childPlace.position().left + childPlace.outerWidth(true) / 2;
              xpos += x1;
            });
            xpos /= parentof[person.id].length;

            const parentid = "#" + id + "person" + person.id;
            const parentPlace = $(parentid);
            const x1 =
              parentPlace.position().left + parentPlace.outerWidth(true) / 2;
            const offset = xpos - x1 - parentPlace.outerWidth(true) / 2;
            if (offset > 0) {
              const offsetDiv = $("#" + id + "offset" + person.id);
              offsetDiv.width(offset);
            }
          }
        });
      });

    // const broadestLevel = leveledNodes[height]
    leveledNodes.slice(height + 1).map((level) => {
      level.map((person) => {
        if (person.id in childof) {
          //get midpoint of parents
          let xpos = 0;
          childof[person.id].map((parent) => {
            const parentid = "#" + id + "person" + parent;
            const parentPlace = $(parentid);
            const x1 =
              parentPlace.position().left + parentPlace.outerWidth(true) / 2;
            xpos += x1;
          });
          xpos /= childof[person.id].length;

          const childid = "#" + id + "person" + person.id;
          const childPlace = $(childid);
          const x1 =
            childPlace.position().left + childPlace.outerWidth(true) / 2;
          const offset = xpos - x1;
          if (offset > 0) {
            const offsetDiv = $("#" + id + "offset" + person.id);
            offsetDiv.width(offset);
          }
        }
      });
    });
  }

  function _drawLines(c, preprocessed, id) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    c.prepend(svg);

    preprocessed.map((level) => {
      let offset = 0;
      let parents = {};
      level.map((person) => {
        const personid = "#" + id + "person" + person.id;
        const personPlace = $(personid);
        const height = personPlace.outerHeight(true) / 2 - 10;
        const x1 =
          personPlace.position().left + personPlace.outerWidth(true) / 2;
        const y1 =
          personPlace.position().top + personPlace.outerHeight(true) / 2;

        // draw marriage lines
        if (person.partner) {
          const partnerid = "#" + id + "person" + person.partner;
          const partnerPlace = $(partnerid);

          const x2 =
            partnerPlace.position().left + partnerPlace.outerWidth(true) / 2;
          const y2 =
            partnerPlace.position().top + partnerPlace.outerHeight(true) / 2;

          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("x1", x1);
          line.setAttribute("y1", y1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);
          svg.appendChild(line);
        }

        // draw parentage lines
        if (person.parent1 && person.parent2) {
          if (!(person.parent1 in parents) && !(person.parent2 in parents)) {
            parents[person.parent1] = offset;
            parents[person.parent2] = offset;
            offset += 15;
          }
          const curroffset = parents[person.parent1];
          const parent1id = "#" + id + "person" + person.parent1;
          const parent2id = "#" + id + "person" + person.parent2;
          const parent1Place = $(parent1id);
          const parent2Place = $(parent2id);

          const x2 =
            (parent1Place.position().left +
              parent1Place.outerWidth(true) / 2 +
              parent2Place.position().left +
              parent2Place.outerWidth(true) / 2) /
            2;
          const y2 =
            (parent1Place.position().top +
              parent1Place.outerHeight(true) / 2 +
              parent2Place.position().top +
              parent2Place.outerHeight(true) / 2) /
            2;

          const line1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line1.setAttribute("x1", x1);
          line1.setAttribute("y1", y1);
          line1.setAttribute("x2", x1);
          line1.setAttribute("y2", y1 - height - curroffset);
          const line2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line2.setAttribute("key", "line2");
          line2.setAttribute("x1", x1);
          line2.setAttribute("y1", y1 - height - curroffset);
          line2.setAttribute("x2", x2);
          line2.setAttribute("y2", y1 - height - curroffset);
          const line3 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line3.setAttribute("x1", x2);
          line3.setAttribute("y1", y1 - height - curroffset);
          line3.setAttribute("x2", x2);
          line3.setAttribute("y2", y2);
          svg.appendChild(line1);
          svg.appendChild(line2);
          svg.appendChild(line3);
        } else if (person.parent1) {
          if (!(person.parent1 in parents)) {
            parents[person.parent1] = offset;
            offset += 15;
          }
          const curroffset = parents[person.parent1];
          const parent1id = "#" + id + "person" + person.parent1;
          const parent1Place = $(parent1id);

          const x2 =
            parent1Place.position().left + parent1Place.outerWidth(true) / 2;
          const y2 =
            parent1Place.position().top + parent1Place.outerHeight(true) / 2;

          const line1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line1.setAttribute("x1", x1);
          line1.setAttribute("y1", y1);
          line1.setAttribute("x2", x1);
          line1.setAttribute("y2", y1 - height - curroffset);
          const line2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line2.setAttribute("key", "line2");
          line2.setAttribute("x1", x1);
          line2.setAttribute("y1", y1 - height - curroffset);
          line2.setAttribute("x2", x2);
          line2.setAttribute("y2", y1 - height - curroffset);
          const line3 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line3.setAttribute("x1", x2);
          line3.setAttribute("y1", y1 - height - curroffset);
          line3.setAttribute("x2", x2);
          line3.setAttribute("y2", y2);
          svg.appendChild(line1);
          svg.appendChild(line2);
          svg.appendChild(line3);
        }
      });
    });
  }

  // user interaction functions
  function _applyClickDrag(c, type) {
    if (type === "x") {
      c.style.overflow = "clip auto";
    }
    else if (type === "y") {
      c.style.overflow = "auto clip";
    }
    else {
      c.style.overflowX = "auto";
    }
    
    c.style.whiteSpace = "nowrap";
    document.addEventListener("DOMContentLoaded", function () {
      const ele = c;
      ele.style.cursor = "grab";

      let pos = { top: 0, left: 0, x: 0, y: 0 };

      const mouseDownHandler = function (e) {
        ele.style.cursor = "grabbing";
        ele.style.userSelect = "none";

        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
        ele.style.cursor = "grab";
        ele.style.removeProperty("user-select");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      // Attach the handler
      ele.addEventListener("mousedown", mouseDownHandler);
    });
  }

  function _applyScaling(scaledWrapper, type) {
    // Get the scaled content, and reset its scaling for an instant
    let scaledContent = scaledWrapper.getElementsByClassName("greegraph")[0];
    scaledContent.style.transform = "scale(1, 1)";
    scaledContent.style.transformOrigin = "0 0"

    let { width: cw, height: ch } = scaledContent.getBoundingClientRect();
    let { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();

    let scaleAmt = 1
    
    if (type === "x") {
      scaleAmt = ww / cw;

      scaledContent.style.transform = `scale(${scaleAmt}, ${scaleAmt})`;
      const { width: scaledWidth } = scaledContent.getBoundingClientRect()

      scaledWrapper.style.width = scaledWidth + "px";
    }
    else if (type === "y") {
      scaleAmt = wh / ch;

      scaledContent.style.transform = `scale(${scaleAmt}, ${scaleAmt})`;
      const { height: scaledHeight } = scaledContent.getBoundingClientRect();

      scaledWrapper.style.height = scaledHeight + "px";
    }
    else {
      scaleAmt = Math.min(ww / cw, wh / ch);

      scaledContent.style.transform = `scale(${scaleAmt}, ${scaleAmt})`;
      const { height: scaledHeight } = scaledContent.getBoundingClientRect();
      const { width: scaledWidth } = scaledContent.getBoundingClientRect()

      scaledWrapper.style.height = scaledHeight + "px";
      scaledWrapper.style.width = scaledWidth + "px";
    }

    const margin = scaleAmt - 1 * 100
    scaledContent.style.marginBottom = margin + "%";
    scaledContent.style.marginRight = margin + "%";

    // scaledCards.style.width = 

    return scaleAmt;
  }

  function _applyDetailsClose(c) {
    const details = [...c.querySelectorAll("details")];
    c.addEventListener("click", function (e) {
      if (!details.some((f) => f.contains(e.target))) {
        details.forEach((f) => f.removeAttribute("open"));
      } else {
        details.forEach((f) =>
          !f.contains(e.target) ? f.removeAttribute("open") : ""
        );
      }
    });
  }

  function _applyAdditionalHover(c) {
    let card = $("#" + c.id + " .personCard")

    card.hover(
      function() {
        let additional = $(this).find("details")
        additional.attr("open", "");
      },
      function() {
        let additional = $(this).find("details")
        additional.removeAttr("open")
      }
    )
  }
  /* End of private properties/functions */

  PedigreeTree.prototype = {
    generate: function (c, persons) {
      console.log("Initialising PedigreeTree");

      if (this.graphheight) {
        c.style.height = this.graphheight;
      }
      if (this.graphwidth) {
        c.style.width = this.graphwidth;
      }
      c.style.border = "1px solid black";

      const wrapper = document.createElement("div");
      wrapper.className = "greegraph";
      c.appendChild(wrapper);

      const preprocessed = _preprocess(persons);
      console.log("Preprocessing completed");

      preprocessed[0].map((level) => {
        const levelDiv = document.createElement("div");
        wrapper.appendChild(levelDiv);
        level.map((person) => {
          this.addCard(levelDiv, person);
        });
      });
      console.log("Initial Card Generation Complete");

      _applyOffsets(preprocessed, this.id);
      console.log("Offsets Created");

      _drawLines(wrapper, preprocessed[0], this.id);
      console.log("Lines Drawn");

      if (this.scaling) {
        console.log("Scaled with factor ", _applyScaling(c, this.scalingType));
      }

      if (this.clickdrag) {
        _applyClickDrag(c, this.scalingType);
        console.log("Click to drag applied");
      }

      if (!this.multiOpen) {
        _applyDetailsClose(c);
        console.log("Details close on click");
      }

      if (this.hover) {
        _applyAdditionalHover(c);
        console.log("Hover for additional enabled")
      }
      
    },

    addCard: function (c, person) {
      // offset div
      const leftoffset = document.createElement("div");
      leftoffset.style = "display: inline-block; height: 10px; width: 0px";
      leftoffset.setAttribute("id", this.id + "offset" + person.id);
      c.appendChild(leftoffset);

      // card
      const placementDiv = document.createElement("div");
      placementDiv.className = "placement";
      placementDiv.setAttribute("id", this.id + "person" + person.id);
      c.appendChild(placementDiv);

      const personCardDiv = document.createElement("div");
      personCardDiv.className = "personCard";
      personCardDiv.style.backgroundColor = this.cardcolor
      placementDiv.appendChild(personCardDiv);

      if (person.gender) {
        const genderBar = document.createElement("div");
        genderBar.className = "headerBar";
        person.gender === "male"
          ? (genderBar.style = "background: rgb(3,155,229)")
          : (genderBar.style = "background: pink");
        personCardDiv.appendChild(genderBar);
      }

      const personWrapperDiv = document.createElement("div");
      personWrapperDiv.className = "personWrapper";
      personWrapperDiv.style.height = "max("+this.cardheight + "px, 105px)";
      personWrapperDiv.style.width = this.cardwidth + "px";
      personWrapperDiv.style.fontSize = this.cardfontSize + "px";
      personWrapperDiv.style.margin = "10px"
      personCardDiv.appendChild(personWrapperDiv);

      const personImg = document.createElement("img");
      personImg.className = "personImg";
      const personDetailsDiv = document.createElement("div");
      personDetailsDiv.className = "personDetails";
      if (person.image) {
        personImg.src = person.image;
        personWrapperDiv.appendChild(personImg);
        const image = $(personImg);
        personDetailsDiv.style.maxWidth =
          this.cardwidth - image.outerWidth(true) + "px";
      } else {
        personWrapperDiv.appendChild(personImg);
        personDetailsDiv.style.maxWidth = this.cardwidth + "px";
      }
      personWrapperDiv.appendChild(personDetailsDiv);

      if (person.name) {
        const personNameDiv = document.createElement("div");
        personNameDiv.className = "personName";
        if (person.link) {
          personNameDiv.innerHTML =
            "<a href=" +
            person.link +
            "><img src='./assets/arrow-up-right-from-square-solid.svg' style='height: 1em'></img> " +
            person.name +
            "</a>";
        } else {
          personNameDiv.innerText = person.name;
        }
        personDetailsDiv.appendChild(personNameDiv);
      }

      if (person.dates) {
        const personDatesDiv = document.createElement("div");
        personDatesDiv.className = "personDates";
        personDatesDiv.innerText = person.dates;
        personDetailsDiv.appendChild(personDatesDiv);
      }

      if (person.glance) {
        const personGlanceDiv = document.createElement("div");
        personGlanceDiv.className = "personGlance";
        personGlanceDiv.innerHTML = person.glance;
        personDetailsDiv.appendChild(personGlanceDiv);
      }

      if (person.additional) {
        const personAdditionalDiv = document.createElement("div");
        personAdditionalDiv.className = "personAdditional";
        personDetailsDiv.appendChild(personAdditionalDiv);
        const details = document.createElement("details");
        details.className = "additionalDetails"
        details.innerHTML =
          "<summary class = 'additionalSummary'>More</summary>";
        personAdditionalDiv.appendChild(details);
        const additionalCardDiv = document.createElement("div");
        additionalCardDiv.className = "additionalCard";
        details.appendChild(additionalCardDiv);

        if (person.additional.description) {
          const personDescription = document.createElement("span");
          personDescription.innerText = person.additional.description;
          additionalCardDiv.append(personDescription);
        }

        const additionalTable = document.createElement("table");
        additionalCardDiv.append(additionalTable);
        for (const [key, value] of Object.entries(person.additional)) {
          if (key !== "description") {
            let newkey = key.split("_");
            newkey.map((word, index) => {
              newkey[index] = word[0].toUpperCase() + word.substr(1);
            });
            newkey = newkey.join(" ");

            const additionalRow = document.createElement("tr");
            additionalRow.innerHTML =
              "<th>" + newkey + "</th><td>" + value + "</td>";
            additionalTable.appendChild(additionalRow);
          }
        }
      }
    },

    // developer options functions
    setGraph: function ({height="auto", width="100%", scaling=true, scalingType=null, clickdrag=false, multiOpen=false}) {
      this.graphheight = height;
      this.graphwidth = width;
      
      if (typeof scaling === "boolean") {
        this.scaling = scaling;
      }
      this.scalingType=scalingType;
      if (typeof clickdrag === "boolean") {
        this.clickdrag = clickdrag;
      }
      if (typeof multiOpen === "boolean") {
        this.multiOpen = multiOpen;
      }
      if (typeof relation === "boolean") {
        this.relation = relation;
      }
    },

    setCard: function ({height=100, width=250, fontsize=16, cardcolor="floralwhite", hover=false}) {
      if (typeof height === "number") {
        this.cardheight = height;
      }
      if (typeof width === "number") {
        this.cardwidth = width;
      }
      this.cardcolor = cardcolor;
      if (typeof fontsize === "number") {
        this.cardfontSize = fontsize;
      }
      if (typeof hover === "boolean") {
        this.hover = hover;
      }
      console.log(this.cardcolor)
    },
  };

  /* Can do all other library setup below without conflicting with the global namespace */
  // ...
  // ...

  // After setup:
  // Add the PedigreeTree to the window object if it doesn't already exist.
  global.PedigreeTree = global.PedigreeTree || PedigreeTree;
})(window, window.document, $);
