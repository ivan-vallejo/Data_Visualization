# Data visualization
## Project for the Barcelona Graduate School of Economics based on data from the International Telecommunication Union on Internet users worldwide

<p> ITU collects statistics on several ICT developments, being one of the most important indicators the one measuring "Internet users" (e.g. it is included in the Sustainable Development Goals' global indicator framework). ITU wants to draw attention to the population not yet connected by informing on questions such as: How many are they? Where are they? What is the situation today compared to five years ago?</p>
<p>This chart is an initial proposal to visually present the data on non-Internet users and address the questions raised about them. The regional classification corresponds to that followed by ITU (UN M49). Colors have been chosen based on the Color Brewer qualitative palette that better matches <a href="http://www.itu.int/en/ITU-D/Pages/ITUAroundTheWorld.aspx">ITU's usual colors for regions</a>.</p>
<p>The treemap proposed allows to visually see in which regions and countries most non-Internet users live. Indeed, from top to bottom and left to right, countries and regions are classified according to the absolute number of non-Internet users. The size of the treemap is proportional to the global number of non-Interent users in 2010. As a result, the animation shows graphically how the unconnected have decreased, plus changes in relative rankings within regions. For instance, Brazil was the country with most non-Internet users in the Americas in 2010, whereas in 2015 the United States was home to the largest number of non-Internet users in the region.</p>
<p> The map allows to zoom into different regions in order to see in more detail the distribution of non-Interent users within each region. Moreover, it is possible to see the evolution from one year to another for a specific region. The treemap of each region is sized proportionally to the number of non-Internet users in the region in 2010. Therefore, the animation shows how non-Internet users have decreased from 2010 to 2015 or, going backwards in time, how they increased from 2015 to 2010, in each region.</p>

<p> The d3.js code and the underlying data (csv format) are available at my <a href="https://github.com/ivan-vallejo/Data_Visualization">GitHub account</a>. </p>
