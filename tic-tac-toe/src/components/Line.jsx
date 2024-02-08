const Line = ({activate, starting, orientation}) => {
    const position = () => {
        if(orientation === "vertical") {
            switch(starting) {
                case 0:
                    return 4;
                case 1:
                    return 12;
                case 2:
                    return 20.5;
            }
        } else if(orientation === "horizontal") {
            switch(starting) {
                case 0:
                    return 4;
                case 1:
                    return 12;
                case 2:
                    return 20.7;
            }
        }
    };

    if(orientation === "vertical") {

        return (

            <div className={"crossing-line"} id="vertical" style={{ marginLeft: position() + "rem" }}>

            </div>
        )

    } else if( orientation === "horizontal") {
        return (

            <div className={"crossing-line"} id="horizontal" style={{ marginTop: position() + "rem" }}>

            </div>
        )
    } else if(orientation === "slanted-left") {
        return (
            <div className={"crossing-line"} id="slanted-left"></div>
        )
    } else if(orientation === "slanted-right") {
        return (
            <div className={"crossing-line"} id="slanted-right"></div>
        )
    }
}

// const line = document.querySelector(".crossing-line");
// const lineStyle = window.getComputedStyle(line);
// console.log(lineStyle);

export default Line;