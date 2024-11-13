SELECT p.id, p.title, p.cost_per_night, avg(pr.rating) as average_rating
FROM properties p
JOIN property_reviews pr
ON pr.property_id = p.id
WHERE lower(p.city) like '%vancouver%'
GROUP BY p.id, p.title, p.cost_per_night
HAVING avg(pr.rating) >= 4
ORDER BY p.cost_per_night 
LIMIT 10;
