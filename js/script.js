/*
var userAccounts = [
    { email: 'sean_bartolome@dlsu.edu.ph', password: 'seanpogi123', type: 'student', image: 'images/dp.jpg', name: 'Sean Bartolome', bio: 'BSIT ID 121 Woo!', },
    { email: 'andrei_castillo@dlsu.edu.ph', password: 'deipogi123', type: 'student', image: 'images/dp2.jpg', name: 'Andrei Castillo', bio: 'BSIT ID 121 Woo!',},
    { email: 'norman_salas@dlsu.edu.ph', password: 'normspogi123', type: 'student', image: 'images/dp4.jpg', name: 'Norman Salas', bio: 'BSIT ID 121 Woo!',},
    { email: 'yuan_patawaran@dlsu.edu.ph', password: 'yuanpogi123', type: 'student', image: 'images/dp3.jpg', name: 'Yuan Patawaran', bio: 'BSIT ID 121 Woo!',},
    { email: 'labtech@dlsu.edu.ph', password: 'admin123', type: 'labtech', image: 'images/dp5.jpg', name: 'Lab Tech', bio: 'Your Friendly Neighborhood Lab Tech!',},
];

*/

var LabSeats = [
    { seatNum: 1,  },
    { seatNum: 2,  },
    { seatNum: 3,  },
    { seatNum: 4,  },
    { seatNum: 5,  },
    { seatNum: 6,  },
    { seatNum: 7,  },
    { seatNum: 8,  },
    { seatNum: 9,  },
    { seatNum: 10,  },
    { seatNum: 11,  },
    { seatNum: 12,  },
    { seatNum: 13,  },
    { seatNum: 14,  },
    { seatNum: 15,  },
    { seatNum: 16,  },
    { seatNum: 17,  },
    { seatNum: 18,  },
    { seatNum: 19,  },
    { seatNum: 20,  },
    { seatNum: 21,  },
    { seatNum: 22,  },
    { seatNum: 23,  },
    { seatNum: 24,  },
    { seatNum: 25,  }
];

var reservationList = [
    {reservationNum: 1, date: 'Monday, October 23, 2023', time: '11:00 AM', lab: 'G301', seatNum: 4, owner: 'sean_bartolome@dlsu.edu.ph', anonymous: 'yes', bookingDate: 'Saturday, October 28, 2023', bookingTime: '7:00 AM'},
    {reservationNum: 1, date: 'Monday, October 23, 2023', time: '11:00 AM', lab: 'G301', seatNum: 12, owner: 'sean_bartolome@dlsu.edu.ph', anonymous: 'yes', bookingDate: 'Saturday, October 28, 2023', bookingTime: '7:00 AM'},
    {reservationNum: 2, date: 'Monday, October 23, 2023', time: '1:00 PM', lab: 'G301', seatNum: 8, owner: 'sean_bartolome@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Monday, October 30, 2023', bookingTime: '7:00 AM'},
    {reservationNum: 3, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G302', seatNum: 2, owner: 'labtech@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Wednesday, October 25, 2023', bookingTime: '7:00 AM'},
    {reservationNum: 4, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 5, owner: 'labtech@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Thursday, October 26, 2023', bookingTime: '7:00 AM'},
    {reservationNum: 5, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 15, owner: 'andrei_castillo@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Friday, October 27, 2023', bookingTime: '9:00 AM'},
    {reservationNum: 6, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 12, owner: 'yuan_patawaran@dlsu.edu.ph', anonymous: 'yes', bookingDate: 'Friday, November 03, 2023', bookingTime: '6:22 AM'},
    {reservationNum: 7, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 20, owner: 'norman_salas@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Saturday, November 04, 2023', bookingTime: '7:22 AM'},
    {reservationNum: 7, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 21, owner: 'norman_salas@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Saturday, November 04, 2023', bookingTime: '7:22 AM'},
    {reservationNum: 8, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 2, owner: 'labtech@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Friday, November 03, 202', bookingTime: '1:00 AM'},
    {reservationNum: 9, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 8, owner: 'labtech@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Thursday, October 26, 2023', bookingTime: '4:23 AM'},
    {reservationNum: 10, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 23, owner: 'sean_bartolome@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Wednesday, October 25, 2023', bookingTime: '6:27 AM'},
    {reservationNum: 1, date: 'Monday, October 23, 2023', time: '7:00 AM', lab: 'G301', seatNum: 23, owner: 'sean_bartolome@dlsu.edu.ph', anonymous: 'no', bookingDate: 'Friday, October 27, 2023', bookingTime: '6:27 AM'},

]

var selectedLab;
var currentEmail;
var accountInUse;
var currentType = "student";
var otherUserEmail;

function updateSelectedLab(value) {
    localStorage.setItem('selectedLab', value);
    console.log("Selected Lab:", value); // log the selectedLab variable
}




const labNames = ["Lab A", "Lab B", "Lab C", "Lab D", "Lab E", "Lab F"]; // Replace with your laboratory names
let currentLabIndex = 0;

const labBoxContainer = document.querySelector(".lab-box-container");
const prevLabButton = document.getElementById("prevLab");
const nextLabButton = document.getElementById("nextLab");

function displayLabBoxes() {
    labBoxContainer.innerHTML = "";
    const endIndex = Math.min(currentLabIndex + 4, labNames.length); // Calculate the end index
    for (let i = currentLabIndex; i < endIndex; i++) {
        const labBox = document.createElement("div");
        labBox.classList.add("lab-box");
        labBox.textContent = labNames[i];
        labBoxContainer.appendChild(labBox);
    }
    // Disable/Enable arrow buttons based on the currentLabIndex
    prevLabButton.disabled = currentLabIndex === 0;
    nextLabButton.disabled = currentLabIndex + 4 >= labNames.length;
}

displayLabBoxes();

prevLabButton.addEventListener("click", () => {
    if (currentLabIndex > 0) {
        currentLabIndex -= 4;
        labBoxContainer.style.transform = `translateX(-${currentLabIndex * 220}px)`;
        displayLabBoxes();
    }
});

nextLabButton.addEventListener("click", () => {
    if (currentLabIndex + 4 < labNames.length) {
        currentLabIndex += 4;
        labBoxContainer.style.transform = `translateX(-${currentLabIndex * 220}px)`;
        displayLabBoxes();
    }
});

// Initially disable the left arrow button as it's at the beginning
prevLabButton.disabled = true;
