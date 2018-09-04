//Necessary setup

//window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 8000; //stops Codepen freaking out about lengthy loops

//Sorting functions

function bubble_sort(arr, row) {
	let steps = [];
	let swapped = true;
	let i = arr.length - 1;
	while (swapped === true && i > 0) {
		swapped = false;
		for (let j = 0; j < i; j++) {
			steps.push(arr.slice(0));
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				swapped = true;
				steps.push(arr.slice(0));
			}
		}
		i -= 1;
	}
	steps.push(arr.slice(0));
	return steps;
}

function cocktail_shaker_sort(arr, row) {
	let steps = [];
	let swapped = true;
	let i = arr.length - 1;
	let lower = 0;
	while (swapped === true && i > 0) {
		swapped = false;
		for (let j = lower; j < i; j++) {
			steps.push(arr.slice(0));
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				swapped = true;
				steps.push(arr.slice(0));
			}
		}
		for (let k = i; k > lower; k--) {
			steps.push(arr.slice(0));
			if (arr[k] < arr[k - 1]) {
				let temp = arr[k];
				arr[k] = arr[k - 1];
				arr[k - 1] = temp;
				swapped = true;
				steps.push(arr.slice(0));
			}
		}
		lower += 1;
		i -= 1;
	}
	steps.push(arr.slice(0));
	return steps;
}

function insertion_sort(arr, row) {
	let steps = [];
	for (let i = 1; i < arr.length; i++) {
		let pos = i;
		let key = arr[i];
		while (pos > 0 && key < arr[pos - 1]) {
			steps.push(arr.slice(0));
			arr[pos] = arr[pos - 1];
			pos = pos - 1;
		}
		arr[pos] = key;
		steps.push(arr.slice(0));
	}
	steps.push(arr.slice(0));
	return steps;
}

function selection_sort(arr, row) {
	let steps = [];
	for (let i = 0; i < arr.length; i++) {
		let smallest_index = i;
		for (let j = i + 1; j < arr.length; j++) {
			steps.push(arr.slice(0));
			if (arr[j] < arr[smallest_index]) {
				smallest_index = j;
			}
		}
		let temp = arr[i];
		arr[i] = arr[smallest_index];
		arr[smallest_index] = temp;
		steps.push(arr.slice(0));
	}
	steps.push(arr.slice(0));
	return steps;
}

function quick_sort(arr, steps, start = 0, end = -1) {
	if (end == -1) {
		//if there's no end point set
		end = arr.length - 1; //set the end point to the last index of the array
	}
	if (start >= end) {
		//if the start is later than or the same as the end
		steps.push(arr.slice(0));
		return; //just stop, as this list is sorted
	} else {
		let pivot = end; //set the pivot as the furthest right value;
		let higher = pivot - 1; //mark the upper bound of the unsorted list
		let lower = start; //mark the lower bound of the unsorted list
		while (lower <= higher) {
			steps.push(arr.slice(0));
			//as long as there are still unsorted items
			if (arr[lower] <= arr[pivot]) {
				//if the item at the lower bound is smaller than or equalt to the pivot
				lower += 1; //shift the lower bound up one
			} else {
				//if the item is larger than the pivot
				let temp = arr[lower]; //swap the values
				arr[lower] = arr[higher];
				arr[higher] = temp;
				higher -= 1; //move the lower bound
				steps.push(arr.slice(0));
			}
		} //once all is sorted on either side of the pivot
		steps.push(arr.slice(0));
		let temp = arr[pivot]; //store the pivot value
		arr[pivot] = arr[lower]; //move the earliest high value to the final space
		arr[lower] = temp; //move the pivot to the gap
		quick_sort(arr, steps, start, higher); //call quicksort on the lower side
		quick_sort(arr, steps, lower + 1, pivot); //call quicksort on the higher side
	}
}

function quicksort_wrapper(arr) {
	//Holds the steps for quicksort, so that recursion is not a problem.
	let steps = [];
	quick_sort(arr, steps);
	return steps;
}

//Displaying functions and necessary set-up.

class Graphics {
	constructor(ctx, counter, names) {
		this.colours = [
			"#3D2838",
			"#423043",
			"#46394E",
			"#474259",
			"#484C65",
			"#47566F",
			"#446179",
			"#406B81",
			"#3B7688",
			"#35818E",
			"#308C93",
			"#2E9795",
			"#31A197",
			"#38AC96",
			"#44B694",
			"#54C091",
			"#65CA8D",
			"#79D388",
			"#8EDC82",
			"#A4E47C",
			"#BCEB77"
		];
		this.permitted = [0,0,0,0,0]; //Whether each sort should be included in the sorting
		this.CTX = ctx;
		this.block_width = 10;
		this.block_height = 60;
		this.X_offset = 280;
		this.Y_offset = 10;
		this.sort_animation = null;
		this.step = 0;
		this.counter = counter;
		this.names = names;
		this.update_step = function() {
			this.counter.innerHTML = this.step;
		};
		this.display_names = function() {
			this.CTX.font = "20px Arial";
			for (let i = 0; i < this.names.length; i++) {
				this.CTX.fillStyle = "#000000";
				this.CTX.fillText(
					this.names[i][0] + " SORT:",
					10,
					30 + graphics.block_height / 2 + i * this.block_height
				);
				this.CTX.fillText(
					this.names[i][0] + " SORT:",
					10,
					30 + graphics.block_height / 2 + i * this.block_height
				);
				this.CTX.fillStyle = this.names[i][1];
				this.CTX.fillText(
					this.names[i][0] + " SORT:",
					10,
					30 + graphics.block_height / 2 + i * this.block_height
				);
				this.CTX.fillText(
					this.names[i][0] + " SORT:",
					10,
					30 + graphics.block_height / 2 + i * this.block_height
				);
				this.CTX.fillText(
					this.names[i][0] + " SORT:",
					10,
					30 + graphics.block_height / 2 + i * this.block_height
				);
				this.CTX.fillText(
					this.names[i][0] + " SORT:",
					10,
					30 + graphics.block_height / 2 + i * this.block_height
				);
			}
		};
		this.display_block = function(x, y, height, colour) {
			this.CTX.fillStyle = "#000000";
			this.CTX.fillRect(x, y, this.block_width, this.block_height);
			this.CTX.fillStyle = colour;
			let offset = this.block_height - height * 3;
			this.CTX.fillRect(x, y + offset, this.block_width, height * 3);
		};
		
		this.display_frame = function(frame, y_axis) {
			//Displays a full frame - all the different blocks from a snapshot of a list
			for (let i = 0; i < frame.length; i++) {
				this.display_block(
					i * this.block_width + this.X_offset,
					y_axis * this.block_height + this.Y_offset,
					frame[i],
					this.colours[this.colours.length - 1 - frame[i]]
				);
			}
		};
		this.display_step = function(holder) {
			for (let i = 0; i < holder.length; i++) {
				if (this.permitted[i] == 1){
					if (holder[i].length - 1 >= this.step) {
					this.display_frame(holder[i][this.step], i);
					this.names[i][1] = "#FFFFFF";
				} else {
					this.display_frame(holder[i][holder[i].length - 1], i);
					this.names[i][1] = "#00FF00";
				}
				} else {
					this.blank_frame(holder[i][0], i);
				}
			}
			this.update_step();
			this.display_names();
		};
		
		this.display_sorts = function(holder) {
			clearInterval(this.sort_animation);
			//loop through all the sorts repeatedly, showing one frame at a time, until all are finished.
			this.sort_animation = setInterval(() => {
				let running = false;
				for (let i = 0; i < holder.length; i++) {
					if (this.permitted[i] == 1){
						if (holder[i].length - 1 >= this.step){ 
						running = true;
						this.display_frame(holder[i][this.step], i);
						this.names[i][1] = "#FFFFFF";
					} else {
						this.display_frame(holder[i][holder[i].length - 1], i);
						this.names[i][1] = "#00FF00";
					}
					} else {
						this.blank_frame(holder[i][0], i);
					}
				}
				this.step += 1;
				this.update_step();
				this.display_names();
				if (running === false) {
					clearInterval(this.sort_animation);
				}
			}, 20);
		};
		this.display_clear = function(holder) {
			this.step = 0;
			clearInterval(this.sort_animation);
			this.display_step(holder);
			for (let i = 0; i < this.names.length; i++) {
				this.names[i][1] = "#FFFFFF";
			}
			this.display_names();
		};
		this.display_pause = function() {
			clearInterval(this.sort_animation);
		};
		this.blank_frame = function(frame, y_axis){
			for (let i = 0; i < frame.length; i++) {
				this.display_block(
					i * this.block_width + this.X_offset,
					y_axis * this.block_height + this.Y_offset,
					frame[i],
					"#000000"
				);
			}
		}
	}
}

//Generating lists and collecting steps functions

const Sort_num = 90; //Number of values in a list

function make_list(num) {
	// returns a list of numbers from 0 to 10 inclusive.
	let arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(Math.floor(Math.random() * 21));
	}
	return arr;
}

function run_sorts(arr) {
	//Run a bunch of sorts, and collect the steps they take.
	let step_holder = [];
	step_holder.push(bubble_sort(arr.slice(0)));
	step_holder.push(cocktail_shaker_sort(arr.slice(0)));
	step_holder.push(insertion_sort(arr.slice(0)));
	step_holder.push(selection_sort(arr.slice(0)));
	step_holder.push(quicksort_wrapper(arr.slice(0)));
	return step_holder;
}

function clude_sorts(boxes, graphics){
	for (let i =0; i < boxes.length; i++){
		if (document.querySelector(boxes[i]).checked){
			graphics.permitted[i] = 1;
		} else {
			graphics.permitted[i] = 0;
		}
	}
}

//Connection of functions to UI elements

document.querySelector("#Reset").onclick = function() {
	clude_sorts(checkboxes, graphics)
	let current_list = make_list(Sort_num);
	current_holder = run_sorts(current_list);
	graphics.display_clear(current_holder);
};

document.querySelector("#Run").onclick = function() {
	graphics.display_sorts(current_holder);
};

document.querySelector("#Pause").onclick = function() {
	graphics.display_pause();
};

document.querySelector("#Step").onclick = function() {
	graphics.step += 1;
	graphics.display_step(current_holder);
};

document.querySelector("#Re_step").onclick = function() {
	if (graphics.step > 0) {
		graphics.step -= 1;
	}
	graphics.display_step(current_holder);
};

let checkboxes = ["#bubble_check","#cocktail_check","#insertion_check","#selection_check","#quick_check"]

for(var i = 0; i < checkboxes.length; i++) {
    document.querySelector(checkboxes[i]).addEventListener('change', function(){
        clude_sorts(checkboxes, graphics);
    });
}

//Actual execution of code

let current_holder = []; //The sorting steps
let graphics = new Graphics(
	document.querySelector("#surface").getContext("2d"),
	document.querySelector("#Step_counter"),
	[
		["BUBBLE", "#FFFFFF"],
		["COCKTAIL-SHAKER", "#FFFFFF"],
		["INSERTION", "#FFFFFF"],
		["SELECTION", "#FFFFFF"],
		["QUICK", "#FFFFFF"]
	]
); //Holder for graphics constants, cleans up the global namespace.

document.querySelector("#Reset").click();

/*TODO
5. sort names
6. include/exclude sorts
n. more sorts
*/