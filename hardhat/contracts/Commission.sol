// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Commission {
    struct User {
        string name;
        string email;
        bytes32 password;
        string profile;
        uint32 requestsLength;
        mapping(uint32 => RequestForUser) requests;
    }

    struct Artist {
        string name;
        string email;
        bytes32 password;
        string about;
        string profile;
        uint32 portfolioLength;
        mapping(uint32 => string) portfolio;
        uint32 packagesLenght;
        mapping(uint32 => Package) packages;
        uint32 requestsLength;
        mapping(uint32 => RequestForUser) requests;
    }

    struct Package {
        string title;
        string description;
        uint32 price;
        bool isMarkedDeleted;
        uint32 requestsLenght;
        mapping(uint32 => Request) requests;
    }

    struct Request {
        bool isRequesterArtist;
        uint32 userId;
        uint32 userRequestId;
        bool exists;
    }

    struct RequestForUser {
        uint32 artistId;
        string packageTitle;
        uint32 packagePrice;
        string description;
        uint32 imagesLenght;
        mapping(uint32 => string) images;
    }

    uint32 public usersLength = 0;
    uint32 public artistsLength = 0;
    mapping(uint32 => User) public users;
    mapping(uint32 => Artist) public artists;
    string private constant DEFAULT_ARTIST_PROFILE = 'bafkreibsywjj2duaupotjzjzgt4g57tenvypqqa52yux2xv77mh364vrkm';
    string private constant DEFAULT_USER_PROFILE = 'bafkreidcci7riyhvjpimiz7lgfvbyd6ug5xajoykw5vsub7pqp4gyllmly';

// Sign up and login
    function addUser(string memory name, string memory email, string memory password, string memory profile) public {
        User storage user = users[usersLength];
        user.name = name;
        user.email = email;
        user.password = keccak256(abi.encodePacked(password));
        if (equals(profile, '')) {
            user.profile = DEFAULT_USER_PROFILE;
        } else {
            user.profile = profile;
        }
        user.requestsLength = 0;
        usersLength++;
    }

    function addArtist(string memory name, string memory email, string memory password, string memory about, string memory profile, string[] memory portfolio) public {
        Artist storage artist = artists[artistsLength];
        artist.name = name;
        artist.email = email;
        artist.password = keccak256(abi.encodePacked(password));
        artist.about = about;
        if (equals(profile, '')) {
            artist.profile = DEFAULT_ARTIST_PROFILE;
        } else {
            artist.profile = profile;
        }
        artist.portfolioLength = 0;
        for (uint32 i = 0; i < portfolio.length; i++) {
            artist.portfolio[i] = portfolio[i];
            artist.portfolioLength++;
        }
        artist.packagesLenght = 0;
        artist.requestsLength = 0;
        artistsLength++;
    }

    function isEmailTaken(string memory email) public view returns (bool) {
        for (uint32 i = 0; i < usersLength; i++) {
            if (equals(users[i].email, email)) {
                return true;
            }
        }
        for (uint32 i = 0; i < artistsLength; i++) {
            if (equals(artists[i].email, email)) {
                return true;
            }
        }
        return false;
    }

    function login(string memory email, string memory password) public view returns (int, bool) {
        for (uint32 i = 0; i < usersLength; i++) {
            if (equals(users[i].email, email) && users[i].password == keccak256(abi.encodePacked(password))) {
                return (int32(i), false);
            }
        }
        for (uint32 i = 0; i < artistsLength; i++) {
            if (equals(artists[i].email, email) && artists[i].password == keccak256(abi.encodePacked(password))) {
                return (int32(i), true);
            }
        }
        return (-1, false);
    }

// User getters
    function getUserAccountInfo(uint32 id) public view returns (string memory, string memory, string memory) {
        return (users[id].name, users[id].email, users[id].profile);
    }

// Artist getters
    function getArtistsLenght() public view returns (uint32) {
        return artistsLength;
    }

    function getArtistAccountInfo(uint32 id) public view returns (string memory, string memory, string memory, string memory) {
        return (artists[id].name, artists[id].email, artists[id].about, artists[id].profile);
    }

    function getPortfolioLenght(uint32 id) public view returns (uint32) {
        return artists[id].portfolioLength;
    }

    function getPortfolio(uint32 id) public view returns (string[] memory) {
        uint32 lenght = artists[id].portfolioLength;
        string[] memory images = new string[](lenght);
        for (uint32 i = 0; i < lenght; i++) {
            string memory image = artists[id].portfolio[i];
            // image has been deleted
            if (equals(image, '')) {
                continue;
            }
            images[i] = image;
        }
        return images;
    }

    function getPackagesLenght(uint32 id) public view returns (uint32) {
        return artists[id].packagesLenght;
    }

    function isPackageDeleted(uint32 artistId, uint32 packageId) public view returns (bool) {
        if (equals(artists[artistId].packages[packageId].title, '')) {
            return true;
        }
        return false;
    }

    function isPackageMarkedAsDeleted(uint32 artistId, uint32 packageId) public view returns (bool) {
        return artists[artistId].packages[packageId].isMarkedDeleted;
    }

    function getPackageInfo(uint32 artistId, uint32 packageId) public view returns (string memory, uint32, string memory, bool) {
        Package storage package = artists[artistId].packages[packageId];
        return (package.title, package.price, package.description, package.isMarkedDeleted);
    }

    function getPackageRequestedNumber(uint32 artistId, uint32 packageId) public view returns (uint32) {
        Package storage package = artists[artistId].packages[packageId];
        uint32 amount = 0;
        for (uint32 i = 0; i < package.requestsLenght; i++) {
            if (package.requests[i].exists) {
                amount++;
            }
        }
        return amount;
    }

    function getRequestedPackageInfo(uint32 artistId, uint32 packageId, uint32 amountOfRequests) public view returns (string[] memory, string[] memory,  uint32[] memory, string[] memory, uint32[] memory) {
        Package storage package = artists[artistId].packages[packageId];
        uint32 j = 0;

        string[] memory names = new string[](amountOfRequests);
        string[] memory descriptions = new string[](amountOfRequests);
        string[] memory titles = new string[](amountOfRequests);
        uint32[] memory prices = new uint32[](amountOfRequests);
        uint32[] memory requestIds = new uint32[](amountOfRequests);

        for (uint32 i = 0; i < package.requestsLenght; i++) {
            Request memory request = package.requests[i];
            if (request.exists) {
                if (request.isRequesterArtist) {
                    names[j] = artists[request.userId].name;
                    descriptions[j] = artists[request.userId].requests[request.userRequestId].description;
                    requestIds[j] = i;
                    titles[j] = artists[request.userId].requests[request.userRequestId].packageTitle;
                    prices[j] = artists[request.userId].requests[request.userRequestId].packagePrice;
                } else {
                    names[j] = users[request.userId].name;
                    descriptions[j] = users[request.userId].requests[request.userRequestId].description;
                    requestIds[j] = i;
                    titles[j] = users[request.userId].requests[request.userRequestId].packageTitle;
                    prices[j] = users[request.userId].requests[request.userRequestId].packagePrice;
                }
                j++;
            }
        }

        return (names, descriptions, requestIds, titles, prices);
    }

// Getters for user or artist requests
    function getRequestsLenght(uint32 id, bool isArtist) public view returns (uint32) {
        if (isArtist) {
            return artists[id].requestsLength;
        }
        return users[id].requestsLength;
    }

    function getRequestInfo(uint32 userId, uint32 requestId, bool isArtist) public view returns (string memory, string memory, uint32, string memory, bool) {
        RequestForUser storage request = users[userId].requests[requestId];
        if (isArtist) {
            request = artists[userId].requests[requestId];
        }
        Artist storage artist = artists[request.artistId];
        bool isDone = false;
        if (request.imagesLenght > 0) {
            isDone = true;
        }
        return (artist.name, request.packageTitle, request.packagePrice, request.description, isDone);
    }

    function getRequestedImages(uint32 userId, uint32 requestId, bool isArtist) public view returns (string[] memory) {
        RequestForUser storage request = users[userId].requests[requestId];
        if (isArtist) {
            request = artists[userId].requests[requestId];
        }
        string[] memory images = new string[](request.imagesLenght);
        for (uint32 i = 0; i < request.imagesLenght; i++) {
            images[i] = request.images[i];
        }
        return images;
    }

// Artist setters
    function updateAboutDescription(uint32 id, string memory about) public {
        artists[id].about = about;
    }

    function deletePortfolioImage(uint32 artistId, uint32 portfolioId) public {
        delete artists[artistId].portfolio[portfolioId];
    }

    function resetPortfolio(uint32 artistId) public {
        artists[artistId].portfolioLength = 0;
    }

    function addToPortfolio(uint32 id, string memory image) public {
        Artist storage artist = artists[id]; 
        artist.portfolio[artist.portfolioLength] = image;
        artist.portfolioLength++;
    }

    function deletePackage(uint32 artistId, uint32 packageId) public {
        delete artists[artistId].packages[packageId];
    }

    function markPackageAsDeleted(uint32 artistId, uint32 packageId) public {
        artists[artistId].packages[packageId].isMarkedDeleted = true;
    }

    function resetPackageNumber(uint32 artistId) public {
        artists[artistId].packagesLenght = 0;
    }

    function updatePackage(uint32 artistId, uint32 packageId, string memory title, uint32 price, string memory description) public {
        Package storage package = artists[artistId].packages[packageId];
        package.title = title;
        package.price = price;
        package.description = description;
    }

    function addPackage(uint32 id, string memory title, uint32 price, string memory description) public {
        Artist storage artist = artists[id];
        Package storage package = artist.packages[artist.packagesLenght];
        package.title = title;
        package.price = price;
        package.description = description;
        artist.packagesLenght++;
    }

    function completeRequest(uint32 artistId, uint32 packageId, uint32 requestId, string[] memory images) public {
        Request storage request = artists[artistId].packages[packageId].requests[requestId];
        RequestForUser storage userRequest;

        if (request.isRequesterArtist) {
            userRequest = artists[request.userId].requests[request.userRequestId];
        } else {
            userRequest = users[request.userId].requests[request.userRequestId];
        }

        for (uint32 i = 0; i < images.length; i++) {
            userRequest.images[i] = images[i];
        }
        userRequest.imagesLenght = uint32(images.length);

        delete artists[artistId].packages[packageId].requests[requestId];
    }

    function resetPackageRequestNumber(uint32 artistId, uint32 packageId) public {
        artists[artistId].packages[packageId].requestsLenght = 0;
    }

// User or artist setters
    function changeProfilePicture(uint32 id, string memory newImg, bool isArtist) public {
        if (isArtist) {
            artists[id].profile = newImg;
        } else {
            users[id].profile = newImg;
        }
    }

    function requestPackage(uint32 userId, uint32 artistId, uint32 packageId, string memory description, bool isRequesterArtist) public {
        Package storage package = artists[artistId].packages[packageId];
        uint32 userRequestId;
        RequestForUser storage userRequest;

        // create a request by an Artist or a User
        if (isRequesterArtist) {
            Artist storage artist = artists[userId];
            userRequestId = artist.requestsLength;
            userRequest = artist.requests[userRequestId];
            artist.requestsLength++;
        } else {
            User storage user = users[userId];
            userRequestId = user.requestsLength;
            userRequest = user.requests[userRequestId];
            user.requestsLength++;
        }
        userRequest.artistId = artistId;
        userRequest.packageTitle = package.title;
        userRequest.packagePrice = package.price;
        userRequest.description = description;
        userRequest.imagesLenght = 0;

        // store a 'pointer' the previously created request on the requested package
        Request storage request = package.requests[package.requestsLenght];
        request.exists = true;
        request.isRequesterArtist = isRequesterArtist;
        request.userId = userId;
        request.userRequestId = userRequestId;
        package.requestsLenght++;
    }
}

function equals(string memory a, string memory b) pure returns (bool) {
    if (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b))) {
        return true;
    } else {
        return false;
    }
}