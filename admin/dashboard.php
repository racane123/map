<?php
include_once '../header.php';
?>



<style>
    body {
      padding-top: 56px; /* Adjust the height of the fixed navbar */
    }

    @media (min-width: 768px) {
      body {
        padding-top: 0;
      }
    }

    #sidebar {
      height: 100%;
      width: 250px;
      position: fixed;
      top: 56px; /* Adjust the height of the fixed navbar */
      left: 0;
      background-color: #f8f9fa; /* Bootstrap light gray background color */
      padding-top: 20px;
    }

    #content {
      margin-top:50px;
      margin-left: 250px;
      padding: 20px;
    }
  </style>


<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">GIS</a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Sidebar -->
  <div id="sidebar">
    <h4>GIS</h4>
    <ul class="nav flex-column p-1 m-2">
      <li class="nav-item">
        <a class="nav-link active" href="../">HOME</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">BUSINESS PERMIT</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">REAL PROPERTY TAX</a>
      </li>
    </ul>
  </div>

  <!-- Page Content -->
  <div id="content">
    <h1 class="mt-4">Content Goes Here</h1>
    <p>Modify this template to suit your needs.</p>
  </div>