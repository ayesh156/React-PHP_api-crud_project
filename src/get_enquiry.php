<?php

    header('Access-Control-Allow-Origin: *');

    $conn = new mysqli('localhost','root','SEngineer,531','react_api');

    // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve enquiries data
$sql = "SELECT id, name, mobile, email FROM enquiry";
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Fetch associative array
    $enquiries = array();
    while ($row = $result->fetch_assoc()) {
        $enquiries[] = $row;
    }
    // Output data as JSON
    echo json_encode($enquiries);
} else {
    // No enquiries found
    echo "No enquiries found";
}

// Close connection
$conn->close();


?>