INSERT INTO user (admin, user_address, user_email, user_name, user_password) VALUES
(1, '123 Main Street', 'admin@example.com', 'admin', 'admin123'),
(0, '456 Elm Street', 'billy@example.com', 'billyboy', 'billy123');

INSERT INTO product (description, image_url, name, price, stock_quantity, category) VALUES
('A white floreted vegetable similar to broccoli.', 'https://th.bing.com/th/id/R.a9bb5f4e2784a4e038cbae92634cef10?rik=WkEZnPmHt7FiNQ&riu=http%3a%2f%2fnutrawiki.org%2fwp-content%2fuploads%2f2015%2f09%2fCauliflower.jpg&ehk=McP9NlaloU%2bdei9SFVtIx%2fNOFu1Xsc1nnFpasDVm4xI%3d&risl=&pid=ImgRaw&r=0', 'Cauliflower', 4.99, 25, 'Vegetable'),
('An orange root vegetable.', 'https://th.bing.com/th/id/R.b6bdfcb8b33b40138b1251891c6f3c79?rik=0Ld1Ll4NpM5tuA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fcarrot%2fcarrot_PNG4985.png&ehk=iAlKF2BxmuS3wkSSji5OpkKdkuZ2zeOt1js8nHW55uk%3d&risl=1&pid=ImgRaw&r=0', 'Carrots', 0.99, 100, 'Vegetable'),
('Beef cut or ground finely', 'https://th.bing.com/th/id/R.689dbb77b54a5e72ac0008e412890f27?rik=SyCrXv4yHFBCaA&riu=http%3a%2f%2fwww.laketahoemarkets.com%2fuploads%2f1%2f2%2f5%2f7%2f12570712%2fs316008548640775782_p177_i1_w1066.jpeg&ehk=UT%2fi7u0JCNFwRsifwoHj3VwcEMZe97ozKK5HgIzEulg%3d&risl=&pid=ImgRaw&r=0', 'Ground beef', 6.99, 13, 'Meat'),
('Two cuts of chicken breast', 'https://images.eatthismuch.com/site_media/img/451_erin_m_d7cfcfcd-642a-4d6b-b6e8-0adf3eabbff7.png', 'Chicken breasts', 5.45, 22, 'Meat'),
('Milk with 2% fat content', 'https://images.freshop.com/00041900076610/ac4fec5776fd7fddc43c702dfc072c09_large.png', '2% Milk', 5.19, 34, 'Dairy'),
('Dairy based cheese with an orange color', 'https://th.bing.com/th/id/OIP.lnkckrOFVPFHo7xFrKeNKQHaE8?rs=1&pid=ImgDetMain', 'Cheddar cheese', 7.49, 18, 'Dairy'),
('A sweet citrus fruit', 'https://th.bing.com/th/id/OIP.1LgTmhQZ8GtpnJTjT6T4qQHaIR?rs=1&pid=ImgDetMain', 'Oranges', 1.49, 45, 'Fruit'),
('A sweet yellow fruit', 'https://loe.org/content/2014-04-18/10-bananabunch.gif', 'Bananas', 1.72, 37, 'Fruit');

INSERT INTO cart (timestamp, product_id, user_id, quantity) VALUES
('2024-04-16 12:00:00', 18, 3, 1),
('2024-04-16 12:00:00', 21, 3, 1),
('2024-04-16 12:00:00', 24, 3, 3);