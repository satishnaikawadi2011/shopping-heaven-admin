import { Typography } from '@material-ui/core';
import React from 'react';
import AboutAnimation from '../../animations/components/AboutAnimation';
import LayoutWrapper from '../../components/layout/LayoutWrapper';

const AboutHome = () => {
	return (
		<LayoutWrapper noDrawer>
			<div style={{ textAlign: 'center' }}>
				<Typography variant="h2" component="h1">
					Shopping Heaven
				</Typography>
				<AboutAnimation height={350} width={350} />
				<div style={{ textAlign: 'left' }}>
					<Typography variant="body2" style={{ marginBottom: 20 }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloribus voluptas delectus
						asperiores aut possimus! Dignissimos animi unde velit sequi doloremque, nulla excepturi ipsam
						ipsa maxime repellat tempore, illo cumque quaerat facere, cupiditate nostrum. Asperiores
						doloribus vel eveniet veritatis. Tempore sit velit in nam! Aperiam accusantium distinctio sint
						laboriosam a!
					</Typography>
					<Typography variant="body2" style={{ marginBottom: 20 }}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni eum aspernatur qui ratione,
						dicta dolore exercitationem voluptatem est enim nulla facilis, similique a officia natus
						dignissimos. Ducimus magnam ratione ad beatae. Aliquam facilis perferendis, illum quae sit iure.
						Ab assumenda incidunt optio ducimus impedit! Qui similique sit fugiat repellat. Sequi molestiae,
						totam perferendis dolore est ipsum quidem impedit iste illum recusandae sit, minima quaerat?
						Consequuntur laboriosam nesciunt enim odit debitis, distinctio illum rerum reprehenderit, fugiat
						laborum cumque facere ratione molestiae ea aut quam. Nostrum natus illum neque atque magni
						laudantium culpa odio necessitatibus! Placeat fugit harum sapiente eveniet sint, architecto
						ullam accusamus eum excepturi aliquam numquam? Ducimus dignissimos vel eligendi saepe adipisci
						sapiente dicta. Quod quae natus aspernatur voluptates saepe accusamus similique deleniti soluta
						deserunt dolorum, odit nam, ab tempora sit asperiores dolore suscipit unde voluptatem
						laudantium? Totam nemo, dicta id suscipit, excepturi in reiciendis nobis hic nisi nesciunt
						pariatur!
					</Typography>
					<Typography variant="body2" style={{ marginBottom: 20 }}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit molestias recusandae tempore,
						dolor modi consectetur expedita eos accusamus quia cumque, atque, corporis quo? Incidunt,
						molestiae harum sint quae asperiores ex excepturi adipisci, perspiciatis, voluptates dolorum
						doloribus quia obcaecati est quibusdam mollitia necessitatibus eveniet amet suscipit laudantium
						rerum nesciunt. Praesentium debitis mollitia dignissimos dolores perferendis ipsum minus quae
						eos deleniti, odit quis quam id, libero repellat, doloremque architecto. Autem sunt molestiae,
						suscipit deserunt officiis asperiores in libero magni doloribus iste sit, consequatur nesciunt
						perspiciatis. Harum consequuntur inventore quisquam quod labore? Animi ab doloremque sit dolore
						quasi praesentium officiis iure deleniti quod!
					</Typography>
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default AboutHome;
