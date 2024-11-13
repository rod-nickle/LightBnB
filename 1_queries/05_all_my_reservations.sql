SELECT r.id, p.title, r.start_date, p.cost_per_night, avg(pr.rating) as average_rating
FROM reservations r
JOIN properties p
ON p.id = r.property_id
JOIN property_reviews pr
ON pr.property_id = p.id
WHERE r.guest_id = 1
GROUP BY r.id, p.title, r.start_date, p.cost_per_night
ORDER BY r.start_date
LIMIT 10;
