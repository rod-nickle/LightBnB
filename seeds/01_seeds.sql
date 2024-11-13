
INSERT INTO users 
(name, email, password)
VALUES 
('Rodney', 'rod@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalita', 'rosalita@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Fergus', 'fergus@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties 
(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
(1, 'Cottage', 'Description', 'https://thumbnail.com', 'https://cover-photo.com', 12000, 1, 1, 1, 'Canada', '123 Main Street', 'Calgary', 'AB', 'H0H 0H0'),
(1, 'Townhouse', 'Description', 'https://thumbnail.com', 'https://cover-photo.com', 14000, 1, 2, 3, 'Canada', '456 Main Street', 'Calgary', 'AB', 'H0H 0H0'), 
(1, 'Mansion', 'Description', 'https://thumbnail.com', 'https://cover-photo.com', 18000, 1, 5, 5, 'Canada', '789 Main Street', 'Calgary', 'AB', 'H0H 0H0') ;


INSERT INTO reservations 
(start_date, end_date, property_id, guest_id)
VALUES
('2024/09/01', '2024/09/04', 1, 2),
('2024/10/01', '2024/10/04', 2, 2),
('2024/11/01', '2024/11/04', 3, 3);

INSERT INTO property_reviews 
(guest_id, property_id, reservation_id, rating, message)
VALUES
(2, 1, 1, 5, 'Would highly recommend!'),
(2, 2, 2, 4, 'Would recommend!'),
(3, 3, 3, 3, 'Would not recommend!');