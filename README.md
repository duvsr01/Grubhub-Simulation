# GrubHub Simulation
Prototype of GrubHub Application - Using React, Node.js Redux, MongoDB, Kafka

This application enables customers to search for restaurants, items and order food online. Also, restaurant owners can manage their restaurant operations and orders. It also has messaging feature to enable commmunication between customers and owners.

Requirements:
a) Basic Users (Buyer/Restaurant Owner) functionalities:
>- 1. Sign up new Buyer (Name, Email and password)
>- 2. Sign up new Owner (Name, Email, password, Restaurant name, Restaurant Zip Code)
3. Sign in existing user
4. Sign out.
5. Profile of Buyer (Profile Image, Name, Email, Phone Number)
5. Profile of Owner (Profile Image, Name, Email, Phone Number, Restaurant Name, Restaurant Image, Cuisine)
6. Users can update Profile anytime.
To use the system, a user must login first to the system. Password must be encrypted.
b) Owner:
1. Home Page/Orders:
a. Owner should be able to manage orders
b. Owner should be able to see every order for his restaurant.
c. Order details should have:
1) Ordered Person’s name
2) Ordered Person’s Address
3) Item details:
a) Items
b) Quantity
c) Price
4)Status of the Order
a) New
b) Preparing
c) Ready
d) Delivered
d. Owner should be able to cancel the orders.
e. All the delivered items should be separated as old orders.
2. MENU:
a. Owner should be able to add update sections (Breakfast, Lunch, Appetizers) to the menu.
b. Owner should be able to add items to these sections.
1) Name of item
2) Description of item
3) Image of item
4) Price of item
c. He should be able to delete or update sections.
d. He should be able to delete or update items in a section.
e. He should be able to see items divided based on sections in the menu view.
b) Buyer:
1. Home Page:
d. Buyer should be able to search an item based on item name and go to search view.
2. Search Page:
a. Buyer should be able to see the search results of restaurants offering that item.
b. Buyer should be able to further filter results using cuisine.
c. Buyers should be able to select a restaurant and go to details view.
3. Details Page:
a. Buyer should be able to see items divided into sections
b. Buyer should be able to select an item choose quantity and add it to cart.
c. Buyer can purchase multiple items from a single restaurant at a time.
d. The total amount should be calculated and shown to the buyer in the cart.
e. Buyer should be able to order the items from the cart.
4. Past Orders Page:
a. Buyer should be able to see all the past orders he placed to different restaurants.
5. Upcoming Orders Page:
a. Buyer should be able to see all the upcoming orders and track their status as posted by the restaurant owner.
b. Draggable order cards should be implemented.(New)
d) Messaging feature (New)
a) Messaging feature should be added to the grub hub application.
b) Owners should be able message a buyer who placed order.
c) A buyer should be able message an owner of restaurant from which he
ordered.
e) Pagination (new)
a) Pagination should be added to restaurant search, item listing and other suitable views.

