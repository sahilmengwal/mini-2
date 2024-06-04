<?php
if (isset($_POST['registerBtn'])) {
    $reg_username = $_POST['reg_username'];
    $reg_password = $_POST['reg_password'];
    $reg_email = $_POST['reg_email'];

    // Validate inputs
    if (empty($reg_username) || empty($reg_password) || empty($reg_email)) {
        echo "ALL FIELDS ARE REQUIRED";
        die();
    }

    // Hash the password
    $hashed_password = password_hash($reg_password, PASSWORD_DEFAULT);

    $host = "127.0.0.1";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "new";

    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

    if (mysqli_connect_error()) {
        die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    } else {
        $INSERT = "INSERT INTO ecom (username, password, email) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($INSERT);

        // Use bind_param with "sss" for string, string, string
        $stmt->bind_param("sss", $reg_username, $hashed_password, $reg_email);

        if ($stmt->execute()) {
            echo "New record added";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }
}
?>
