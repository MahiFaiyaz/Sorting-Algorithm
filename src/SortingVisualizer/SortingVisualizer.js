import React, { useEffect, useState } from "react";
import getMergeSortAnimations from "../SortingAlgorithms/MergeSort";
import getInsertionSortAnimations from "../SortingAlgorithms/InsertionSort";
import getBubbleSortAnimations from "../SortingAlgorithms/BubbleSort";
import {
  Button,
  IconButton,
  ButtonGroup,
  Typography,
  Slider,
  Icon,
  Popover,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import "./SortingVisualizer.css";

const useStyles = makeStyles({
  arraySizeSlider: {
    height: window.innerHeight / 2,
    position: "absolute",
    left: 25,
    bottom: 150,
  },
  animationSpeedSlider: {
    height: window.innerHeight / 2,
    position: "absolute",
    right: 25,
    bottom: 150,
  },
  Buttons: {
    position: "relative",
    height: 80,
    bottom: 0,
    padding: 0,
  },
  infoButton: {
    position: "relative",
  },
});

const SortingVisualizer = () => {
  const MAX_ARRAY_SIZE = (window.innerWidth - 200) / 4;
  const [array, setArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [arraySize, setArraySize] = useState(MAX_ARRAY_SIZE / 2 + 25);
  const [barWidth, setBarWidth] = useState(
    (window.innerWidth - 200 - arraySize * 2) / arraySize
  );
  const [allDisabled, setAllDisabled] = useState(false);
  const [onlyGenerateEnabled, setOnlyGenerateEnabled] = useState(false);

  useEffect(() => {
    resetArray(arraySize);
  }, []);

  const resetArray = (arraySize) => {
    const numbers = [];
    for (let i = 0; i < arraySize; i++) {
      numbers.push(randomIntFromInterval(5, window.innerHeight - 200));
    }
    setArray(numbers);
    setTimeout(() => {
      reset2(arraySize);
    }, 10);
    setTimeout(() => {
      setAllDisabled(false);
    }, 10);
  };

  const reset2 = (arraySize) => {
    const numbers = [];
    for (let i = 0; i < arraySize; i++) {
      numbers.push(randomIntFromInterval(5, window.innerHeight - 250));
    }
    setArray(numbers);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const mergeSort = async () => {
    setAllDisabled(true);
    await setOnlyGenerateEnabled(true);
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      setTimeout(() => {
        const [barOneInd, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneInd].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * animationSpeed);
    }
    setTimeout(() => {
      setOnlyGenerateEnabled(false);
    }, animations.length * animationSpeed);
  };

  const InsertionSort = async () => {
    setAllDisabled(true);
    await setOnlyGenerateEnabled(true);

    const animations = getInsertionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneInd, barTwoInd] = animations[i];
      const barOneStyle = arrayBars[barOneInd].style;
      const barTwoStyle = arrayBars[barTwoInd].style;
      setTimeout(() => {
        const temp = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = temp;
      }, i * animationSpeed);
    }
    setTimeout(() => {
      setOnlyGenerateEnabled(false);
    }, animations.length * animationSpeed);
  };

  const BubbleSort = async () => {
    setAllDisabled(true);
    await setOnlyGenerateEnabled(true);

    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneInd, barTwoInd] = animations[i];
      const barOneStyle = arrayBars[barOneInd].style;
      const barTwoStyle = arrayBars[barTwoInd].style;
      setTimeout(() => {
        const temp = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = temp;
      }, i * animationSpeed);
    }
    setTimeout(() => {
      setOnlyGenerateEnabled(false);
    }, animations.length * animationSpeed);
  };

  const classes = useStyles();

  const handleChangeArraySize = (event, newValue) => {
    setBarWidth((window.innerWidth - 200 - newValue * 2) / newValue);
    setArraySize(newValue);
    resetArray(newValue);
  };

  const handleChangeAnimationSpeed = (event, newValue) => {
    setAnimationSpeed(5 - newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className={classes.arraySizeSlider}>
        <Typography id="array-size-slider" gutterBottom>
          Size
        </Typography>
        <Slider
          step={2}
          min={10}
          max={MAX_ARRAY_SIZE}
          disabled={allDisabled}
          orientation="vertical"
          onChange={handleChangeArraySize}
          defaultValue={arraySize}
          aria-labelledby="discrete-slider"
        />
      </div>
      <div className={classes.animationSpeedSlider}>
        <Typography id="array-size-slider" gutterBottom>
          Speed
        </Typography>
        <Slider
          step={0.25}
          min={0}
          max={4.5}
          disabled={allDisabled}
          orientation="vertical"
          onChange={handleChangeAnimationSpeed}
          defaultValue={5 - animationSpeed}
          aria-labelledby="discrete-slider"
        />
      </div>
      <div>
        <div>
          <IconButton
            disabled={onlyGenerateEnabled}
            className="infoButton"
            color="primary"
            onClick={handleClick}
          >
            <InfoIcon />
          </IconButton>
          <Popover
            disabled={allDisabled}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.typography}>
              <strong>Insertion Sort:</strong> Takes each element and moves it
              into the correct position one at a time <br /> <br />
              <strong>Bubble Sort:</strong> Compares adjacent elements and swaps
              them if they are in the wrong order <br /> <br />
              <strong>Merge Sort:</strong> Divides into subarrays, sorts each
              array and merges them back together
            </Typography>
          </Popover>
          <ButtonGroup
            classname={classes.ButtonGroup}
            disableRipple={true}
            variant="contained"
            color="primary"
            disabled={allDisabled}
          >
            <Button onClick={() => InsertionSort()}>Insertion Sort</Button>
            <Button onClick={() => BubbleSort()}>Bubble Sort</Button>
            <Button onClick={() => mergeSort()}>Merge Sort</Button>
          </ButtonGroup>
        </div>
        <div
          className="array-container"
          position="absolute"
          margin-left="auto"
          margin-right="auto"
        >
          {array.map((number, ind) => (
            <div
              className="array-bar"
              key={ind}
              style={{ height: `${number}px`, width: `${barWidth}px` }}
            ></div>
          ))}
        </div>
      </div>
      <div class="wrap">
        <Button
          className={classes.Buttons}
          variant="contained"
          color="primary"
          disableElevation
          fullWidth="true"
          startIcon={<Icon>autorenew</Icon>}
          disabled={onlyGenerateEnabled}
          onClick={() => resetArray(arraySize)}
        >
          Generate New Array
        </Button>
      </div>
    </>
  );
};

export default SortingVisualizer;
