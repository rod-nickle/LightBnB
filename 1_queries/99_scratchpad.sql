-- SELECT p.id, p.title, p.cost_per_night, avg(pr.rating) as average_rating
-- FROM properties p
-- JOIN property_reviews pr
-- ON pr.property_id = p.id
-- WHERE lower(p.city) like '%vancouver%'
-- GROUP BY p.id, p.title, p.cost_per_night
-- HAVING avg(pr.rating) >= 4
-- ORDER BY p.cost_per_night 
-- LIMIT 10;


-- SELECT 
--   p.id,
--   p.owner_id,
--   p.title,
--   p.description,
--   p.thumbnail_photo_url,
--   p.cover_photo_url,
--   p.cost_per_night,
--   p.parking_spaces,
--   p.number_of_bathrooms,
--   p.number_of_bedrooms,
--   p.country,
--   p.street,
--   p.city,
--   p.province,
--   p.post_code,
--   p.active,
--   avg(pr.rating) as average_rating
-- FROM properties p
-- JOIN property_reviews pr
-- ON pr.property_id = p.id
-- WHERE lower(p.city) like '%vancouver%'
-- GROUP BY 
--   p.id,
--   p.owner_id,
--   p.title,
--   p.description,
--   p.thumbnail_photo_url,
--   p.cover_photo_url,
--   p.cost_per_night,
--   p.parking_spaces,
--   p.number_of_bathrooms,
--   p.number_of_bedrooms,
--   p.country,
--   p.street,
--   p.city,
--   p.province,
--   p.post_code,
--   p.active
-- HAVING avg(pr.rating) >= 4
-- ORDER BY p.cost_per_night 
LIMIT 10;

SELECT 
  p.*,
  avg(pr.rating) as average_rating
FROM properties p
JOIN property_reviews pr
ON pr.property_id = p.id
WHERE lower(p.city) like '%vancouver%'
GROUP BY 
  p.id
HAVING avg(pr.rating) >= 4
ORDER BY p.cost_per_night 
LIMIT 10;