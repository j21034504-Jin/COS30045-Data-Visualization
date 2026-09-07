# PowerWise Australia – Television Energy Data Story

## Project Overview

PowerWise Australia is a student data visualisation website created for Exercise 3 of COS30045. The purpose of the website is to communicate findings from television energy-consumption data in a clear and accessible way.

The main data story investigates the question:

**How does TV screen size affect energy consumption?**

The website presents the results using visualisations created from data explored and processed in KNIME Analytics Platform.

---

## Data Story

### Audience

The target audience is Australian consumers who are considering purchasing a television and want to better understand how screen size may relate to electricity use.

The visualisations are designed for a general audience rather than technical users. For this reason, television screen sizes are presented in inches, which are more familiar to consumers than centimetres.

### What the Audience Wants to Know

The main questions explored are:

- Does television energy consumption generally increase as screen size increases?
- How do small, medium and large televisions compare in average energy consumption?
- Does screen technology appear to make a difference when screen size is also considered?

The goal is to help consumers consider energy consumption alongside other purchasing factors such as screen size, price and display technology.

### Visualisation Approach

A scatter plot is used to show the relationship between screen size and labelled energy consumption.

A bar chart is then used to simplify the comparison by grouping televisions into small, medium and large categories.

An additional grouped bar chart is used to compare screen technology and screen-size categories where appropriate.

The visualisations are supported by short explanations so that the findings can be understood without requiring knowledge of KNIME or data-analysis techniques.

---

# About the Data

## Data Source

The project uses the television energy-consumption dataset provided as part of the COS30045 Exercise 2 and Exercise 3 learning activities.

The dataset contains information about televisions available in the Australian market, including variables such as screen size, screen technology and labelled energy consumption.

> **Note:** If an original external source or URL for the dataset is provided in the course materials, it should be added here before final submission.

---

## Data Processing

The dataset was imported and processed using **KNIME Analytics Platform**.

The main processing and exploration steps included:

- importing the television dataset using a CSV Reader node;
- filtering the dataset to retain relevant columns;
- exploring the distribution of television screen sizes using a Histogram node;
- converting screen size from centimetres to inches using an Expression node;
- rounding converted screen-size values where required;
- rearranging columns to make the data easier to inspect;
- creating a string version of screen size for categorical visualisation;
- grouping televisions into **Small**, **Medium** and **Large** screen-size categories;
- using bar charts and scatter plots to explore relationships in the data;
- using a Pivot node to compare screen technology, screen-size category and energy consumption; and
- exporting processed data where required.

The screen-size categories used in the analysis were based on the Exercise 2 instructions:

- **Small:** less than 43 inches
- **Medium:** 44 to 65 inches
- **Large:** greater than 66 inches

The processed data was then used to create the visualisations presented on the website.

---

## Privacy

The dataset contains information about television products rather than personal information about individuals.

No names, contact details, account information or other personally identifiable information are used in this project. Therefore, the privacy risk associated with this analysis is low.

---

## Accuracy and Limitations

The findings should be interpreted within the limits of the supplied dataset.

The dataset may not contain every television model currently available in the Australian market, so the results should not be treated as a complete representation of all televisions sold in Australia.

During data exploration, some unusual screen-size values were identified. These values may represent uncommon television sizes, data-entry issues or possible misclassification, so unusual records should be checked against model information before drawing conclusions from them.

The analysis also shows general patterns rather than proving that screen size alone determines energy consumption. Other factors, including screen technology, model design, brightness settings and usage patterns, may also affect electricity use.

Labelled energy consumption is useful for comparing products, but actual household electricity consumption can vary depending on how long a television is used and how it is configured.

---

## Ethics

The visualisations are intended to communicate the data accurately and avoid misleading the audience.

To support ethical communication:

- charts use clear labels and appropriate chart types;
- the analysis avoids claiming that screen size is the only cause of higher energy consumption;
- unusual or potentially inaccurate data points are acknowledged rather than ignored;
- limitations of the dataset are stated clearly; and
- the findings are presented as general patterns rather than guaranteed outcomes for every television.

The purpose of the website is to help consumers make more informed decisions, not to promote a particular television brand or model.

---

# AI Declaration

Generative AI tools were used as support during this project.

**KNIME AI Assistant** was used to assist with generating an expression for converting television screen size from centimetres to inches.

**ChatGPT** was used to assist with website planning, HTML and CSS refinement, data-story structure, wording and preparation of the README documentation.

AI-generated suggestions were reviewed and adapted before being included in the project. The KNIME workflow, dataset exploration, selection of visualisations and interpretation of the final results were checked against the project requirements and the processed data before submission.

---

## Technologies Used

- KNIME Analytics Platform
- HTML
- CSS
- JavaScript
- GitHub / GitHub Pages

---

## Website Pages

- `index.html` – Home page
- `televisions.html` – General television energy information
- `data-story.html` – Television energy data story and visualisations
- `about.html` – Project information
