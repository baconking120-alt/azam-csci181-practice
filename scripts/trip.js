console.log("trip.js is connected!");

// Driver info
const driver_name = "Adam Azam";

// Trip info
const distance_miles = 120; // One-way distance
const mpg = 25; // Fuel efficiency
const gas_price = 3.5; // Price per gallon
const fuel_capacity = 12; // Tank size in gallons
const is_round_trip = true; // true or false

// Total distance
let total_distance;

// Calculate total distance
if (is_round_trip) {
  total_distance = distance_miles * 2;
} else {
  total_distance = distance_miles;
}

console.log("Total distance:", total_distance, "miles");

// Functions
function calculateGallonsNeeded(distance, mpg) {
  return distance / mpg;
}

function calculateFuelCost(gallons, price) {
  return gallons * price;
}

// Main Program Execution
const gallons_needed = calculateGallonsNeeded(total_distance, mpg);
const total_cost = calculateFuelCost(gallons_needed, gas_price);

// Create container for page output
const mainContent = document.getElementById("main-content");
const outputDiv = document.createElement("div");
outputDiv.className =
  "trip-output p-6 bg-indigo-900 text-white rounded-xl mt-8";
mainContent.appendChild(outputDiv);

// Helper to print both console and page
function display(text) {
  console.log(text);
  const p = document.createElement("p");
  p.innerText = text;
  outputDiv.appendChild(p);
}

// Gas Stops
display("Gas Stops:");
let miles_traveled = 0;
let stop_number = 1;
let spent_so_far = 0;

while (miles_traveled < total_distance) {
  let miles_this_leg = Math.min(
    fuel_capacity * mpg,
    total_distance - miles_traveled,
  );
  miles_traveled += miles_this_leg;

  let gallons_this_leg = miles_this_leg / mpg;
  spent_so_far += gallons_this_leg * gas_price;

  display(
    `Stop ${stop_number}: ${miles_traveled} miles traveled, $${spent_so_far.toFixed(2)} spent`,
  );
  stop_number++;
}

// Final Road Trip Summary

display("\n--- Road Trip Summary ---");
display(`Driver: ${driver_name}`);
display(`Total Distance: ${total_distance} miles`);
display(`Estimated Gallons Needed: ${gallons_needed.toFixed(2)} gallons`);
display(`Estimated Total Fuel Cost: $${total_cost.toFixed(2)}`);
