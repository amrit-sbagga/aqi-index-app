const foundAQIColor = (aqiValue) => {
    let color = '#000000';
    if(aqiValue >= 0 && aqiValue <= 50){
        color = "#55a84f";
    }else if(aqiValue > 50 && aqiValue <= 100){
        color = "#a3c853";
    }else if(aqiValue > 100 && aqiValue <= 200){
        color = "#fff833";
    }else if(aqiValue > 200 && aqiValue <= 300){
        color = "#f29c33";
    }else if(aqiValue > 300 && aqiValue <= 400){
        color = "#e93f33";
    }else if(aqiValue > 400 && aqiValue <= 500){
        color = "#af2d24";
    }
    return color;
}

module.exports = {
    foundAQIColor
}