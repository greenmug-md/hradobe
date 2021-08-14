# Adobe Challenge Series - Use case 1 - Human Recruitment Signing platform

## OVERVIEW

My solution was to build a Web A pplication which can be used as Human Recruitment Signing platform. The Goal of the Application was to make the Contract Creation/Collaboration and Contract Signing be very easy and seamless and secure for both Candidate and Employer. 

This Application leverage Adobe PDF API and Adobe Sign API to build a web application (the Human Recruitment Signing platform).

## HOW I APPROACHED THE CHALLENGE

First thing was to get familiar with the Adobe PDF API and Adobe Sign API functionality to be able to pick the features I can use for my solution. 

1. Create PDFs Api as well as Convert PDF Api which is available in (Node.js Java .Net). As I was building a React Application, I chose to explore the Node js
With the help of 
###Create PDF Api , I could explore different formats such as dynamic HTML; Microsoft Word, PowerPoint, and Excel to create the PDF.
###Convert PDF Api, I could convert existing PDFs to popular formats, such as Microsoft Word, Excel, and PowerPoint, as well as text and image

Both these Api were useful for the Employer to create and amend a Contract. 

2. Second I explored the Apis which can help in Collaborating in the Contract between Employer and Candidate.

###Annotation Api : We can add update, delete annotations , In this the Employee can comment on sections which needs clarification or changes and the Employer can clarify and make ammends when necessary

3. Next I explored the Adobe Sign API, 

  The Api's provided can creates an agreement,Can check the Signing Status of Both Employer and Employees,and finally Download the Signed Agreement.
	 Using the Api , Both Employer and Employee can sign on the Agreement digitally. Once the Agreement is Signed, the Contract can be downloaded locally by both    parties.

Once I had explored the Apis , I then was able to start building the components of the project.

## IMPLEMENTATION

Components of the Application

  1. Login/Registration 
  2. Contract Creation/Amends/Annotation of Contract
  3. Signing of Agreement and Downlading the Contract.


### Login and Registration



## FINAL THOUGHTS 

## Use case

 We are leveraging leverage Adobe PDF API and Adobe Sign API to build a web application (the Human Recruitment Signing platform) for the companies to help them sign a Labor Contract with their candidate employees.


## Video

Video Link :  https://drive.google.com/file/d/19JBmwXcSaQyuHtjxq8bBjydVpGbK3OVy/view?usp=sharing
or
https://www.youtube.com/watch?v=mid4N7Qq81c&feature=youtu.be

## Client and Server
Respective Front End and Back End Readme are present in side folders
Client and Server respectively.
