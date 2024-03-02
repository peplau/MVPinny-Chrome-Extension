# MVPinny for Sitecore

## Team name
⟹ **Go Horse**
  - Anderson Fortaleza
  - José Neto
  - Rodrigo Peplau

![Go Horse](docs/images/Gohorse-300x300.png)<br/>

## Category
⟹ Best use of AI

## Description
  - Module Purpose: <br/>
    - This tool serves as a chat assistant specifically designed for content editors working with Sitecore. Its primary purpose is to facilitate a comprehensive understanding of Sitecore features on the fly. Users can inquire about any aspect of the tool, and it is  connected to MVPinny, an AI model specialized in Sitecore, skillfully developed by the Go Horse Team.

  - How it works<br/>
    - This Chrome extension assists content editors by integrating Sitecore with the MVPinny AI. It aids content authors by directly delivering answers to their questions.

## Video link

⟹ [Video: MVPinny for Sitecore](https://youtu.be/qqNU4hXIuP0)

## Pre-requisites and Dependencies

- Chrome Browser 
- Compatible with any Sitecore version (XP, XM and XM Cloud)

## Installation instructions

1. Install Chrome Browser

2. Clone this repository, or download the ZIP and uncompress it <br/>

3.  Open Google Chrome

4.  Navigate to the Chrome Extensions Management Page <br/>
In the address bar, type the expression below and press Enter.
```extensions
chrome://extensions/
```
<br/>

5. Enable Developer Mode<br/>
In the top-right corner of the Extensions page, toggle the "Developer mode"<br/>
switch to the ON position.<br/>

![alt text](docs/images/image-1.png)<br/>

6. Click on the "Load unpacked" button.<br/>

![alt text](docs/images/image-2.png)<br/>

7. Select Extension Folder<br/>

A file dialog will appear. Navigate to the folder where your locally hosted extension is located, navigate to the "gohorse-chrome-extension", then click "Select Folder" or "Open."<br/>

![alt text](docs/images/image-3.png)<br/>

8. Now you should see the "MVP for Sitecore Settings"<br/>

Fill the "OpenIA Key" field with your OpenAI API Key, and select the "model", then click "Save"<br/>

![alt text](docs/images/image-9.png)<br/>

⟹ If you don't have an API KEY, click on the document below <br/>
- [Creating API Key instructions](CreatingAPIkey.md)<br/>

⟹ Your OpenAI account must support the gpt-4, if it doesn't select the gtp-3.5

9. Make sure you can see the module listed on chrome extensions page<br/>
![alt text](docs/images/image-10.png)<br/>

10. For your convenience, pin the extension to your toolbar. Once you click "Extension button" add the "MVP Pinny for Sitecore"(By Go Horse), <br/>

you will see the plugin on your bar<br/>

 ![alt text](docs/images/image-8.png)<br/>

### Configuration
The critical setup involves the selection of both the "OpenAI Key" and the "model." However, they were already configured in previous steps.<br> If necessary, these selections can be modified by right-clicking on the "MVPinny" logo in the Extensions bar and selecting Options.

![Options](docs/images/Options.png)<br/>


## Usage instructions

1. Open your Sitecore CM instance - Eg: https://cm.sitecore.com.localhost or XM Cloud https://portal.sitecorecloud.io <br/>

2. Browse the page you want to learn more, then click the Go Horse icon

3. Hover over and click the block that you want to learn details - MVPinny opens in a side panel, providing more details and a list of common questions
   
4. You can click one of the questions listed, or type your question to see it responded

![alt text](docs/images/FlipCard4-1.gif)


## Comments
The Go Horse team presents an innovative solution with our Chrome extension module for Sitecore. Serving as a chat assistant, this tool seamlessly integrates the MVPinny chatbot with the Sitecore UI, providing  comprehensive support for Sitecore functionalities. The installation process is user-friendly, with step-by-step instructions and visual aids. Additionally, the configuration and usage instructions are well-documented, ensuring a smooth experience for content authors. Overall, the Go Horse team showcases a well-designed and practical solution to make Sitecore more user-friendly and enhance the efficiency of content editors in Sitecore.
