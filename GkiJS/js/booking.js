var bookings = [
    {
        name: 'Đà Nẵng',
        destination: "Cầu rồng",
        checkInDate: "2012-02-03",
        checkOutDate: "2013-02-03",
        numTravelers: 3,
        image: 'https://th.bing.com/th/id/OIP.VjLdSos_d8-crrvQJWe2ewHaEK?rs=1&pid=ImgDetMain'
    },
    {
        name: 'Hà Nội',
        destination: "Hồ Hoàng Kiếm",
        checkInDate: "2012-02-03",
        checkOutDate: "2013-02-03",
        numTravelers: 3,
        image: 'https://th.bing.com/th/id/R.2ddfd419cb35ad2303542401576067f8?rik=DPlpcg%2fpY3s46g&riu=http%3a%2f%2fhanoi-online.net%2fwp-content%2fuploads%2f2020%2f02%2fho-guom1.jpg&ehk=TjVWZ%2blz0%2fVhWAFZPxEw2Oa9%2b6Djj591i0GhB%2bP5BSo%3d&risl=&pid=ImgRaw&r=0'
    },
    {
        name: 'Hồ Chí Minh',
        destination: "...",
        checkInDate: "2012-02-03",
        checkOutDate: "2013-02-03",
        numTravelers: 3,
        image: 'https://th.bing.com/th/id/R.fc7d8da5418a549804d74b3e28271d9c?rik=sEN0L07U6IG63w&pid=ImgRaw&r=0'
    },
];

function listBookings() {
    var bookingHTML = '';
    for (var i = 0; i < bookings.length; i++) {
        bookingHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${bookings[i].image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${bookings[i].name}</h5>
                        <p class="card-text">Destination: ${bookings[i].destination}</p>
                        <p class="card-text">Check-in Date: ${bookings[i].checkInDate}</p>
                        <p class="card-text">Check-out Date: ${bookings[i].checkOutDate}</p>
                        <p class="card-text">Number of Travelers: ${bookings[i].numTravelers}</p>
                        <button class="form-control btn btn-success" onclick="Details(${i})">Chi tiết</button>
                        
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('bookings').innerHTML = bookingHTML;
}

function Details(i) {
    document.getElementById('show').style.maxHeight = "0"
    document.getElementById('show').style.overflow = 'hidden'
    document.getElementById('detail').style.maxHeight = "300vh"
    var detail = `
                <img src="${bookings[i].image}"  alt="..."  style="width: 100%"> 
                    <div id="details-1">
                        <div id="detail_content" style="width: 70%">
                            <div class="card-body">
                            <h5 class="card-title">${bookings[i].name}</h5>
                            <p class="card-text">Destination: ${bookings[i].destination}</p>
                            <p class="card-text">Check-in Date: ${bookings[i].checkInDate}</p>
                            <p class="card-text">Check-out Date: ${bookings[i].checkOutDate}</p>
                            <p class="card-text">Number of Travelers: ${bookings[i].numTravelers}</p>
                            <button class="form-control btn btn-success" style="width: 50%" onclick="Back()">Back</button>
                        </div>
                    </div>
                </div>
            `
    document.getElementById('detail').innerHTML = detail
}

function Back() {
    document.getElementById('show').style.maxHeight = "100%"
    document.getElementById('detail').style.maxHeight = "0"
    document.getElementById('detail').style.overflow = 'hidden'
}
function addBooking(event) {
    event.preventDefault();
    var name = document.getElementById('nameInput').value;
    var destination = document.getElementById('destinationInput').value;
    var checkInDate = document.getElementById('checkInDateInput').value;
    var checkOutDate = document.getElementById('checkOutDateInput').value;
    var numTravelers = document.getElementById('numTravelersInput').value;
    var image = document.getElementById('imagePreview').src; // Lấy đường dẫn URL của ảnh đã được tải lên

    var newBooking = {
        name: name,
        destination: destination,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numTravelers: numTravelers,
        image: image // Thêm đường dẫn URL của ảnh vào booking
    };

    bookings.push(newBooking);
    listBookings();
    resetForm();
}

function resetForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('destinationInput').value = '';
    document.getElementById('checkInDateInput').value = '';
    document.getElementById('checkOutDateInput').value = '';
    document.getElementById('numTravelersInput').value = '';
    document.getElementById('imagePreview').style.display = 'none'; // Ẩn hình ảnh trước khi tải lên
}

function searchBookings() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var filteredBookings = bookings.filter(function (booking) {
        return booking.name.toLowerCase().includes(searchInput) ||
            booking.destination.toLowerCase().includes(searchInput) ||
            booking.checkInDate.includes(searchInput) ||
            booking.checkOutDate.includes(searchInput);
    });

    var bookingHTML = '';
    for (var i = 0; i < filteredBookings.length; i++) {
        bookingHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${filteredBookings[i].image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${filteredBookings[i].name}</h5>
                        <p class="card-text">Destination: ${filteredBookings[i].destination}</p>
                        <p class="card-text">Check-in Date: ${filteredBookings[i].checkInDate}</p>
                        <p class="card-text">Check-out Date: ${filteredBookings[i].checkOutDate}</p>
                        <p class="card-text">Number of Travelers: ${filteredBookings[i].numTravelers}</p>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('bookings').innerHTML = bookingHTML;
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block'; // Hiển thị hình ảnh trước khi tải lên
    };

    reader.readAsDataURL(file);
}
