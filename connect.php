<?php
// Set content type to JSON for AJAX requests
header('Content-Type: application/json');
// Prevent raw PHP errors from corrupting JSON output
error_reporting(0);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student_reviews";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $anonymous = isset($_POST['anonymous']) ? 1 : 0;
    $student_email = $_POST['student_email'] ?? null;
    $residence_name = $_POST['residence_name'] ?? '';
    $review_message = $_POST['review_message'] ?? '';

    //if the user choose anonymous, set email to NULL
    if ($anonymous == 1) {
        $student_email = NULL;
    } elseif (empty($student_email) || !filter_var($student_email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Please enter a valid student email."]);
        exit;
    }

    //validate required fields
    if (empty($residence_name) || empty($review_message)) {
        echo json_encode(["success" => false, "message" => "Both residence name and review message are required."]);
        exit;
    }

    // prepare and execute sql statements
    $sql = "INSERT INTO reviews (student_email, residence_name, review_message, anonymous) 
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $student_email, $residence_name, $review_message, $anonymous);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Review submitted successfully! The owner will get back to you shortly."]);
    } else {
        throw new Exception("Execution failed: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Submission failed. Please check your database connection."]);
}
