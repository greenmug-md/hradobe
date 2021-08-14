# Adobe Challenge Series - Use case 1 - Human Recruitment Signing platform

## OVERVIEW

My solution was to build a Web A pplication which can be used as Human Recruitment Signing platform. The Goal of the Application was to make the Contract Creation/Collaboration and Contract Signing be very easy and seamless and secure for both Candidate and Employer. 

This Application leverage Adobe PDF API and Adobe Sign API to build a web application (the Human Recruitment Signing platform).

## HOW I APPROACHED THE CHALLENGE

First thing was to get familiar with the Adobe PDF API and Adobe Sign API functionality to be able to pick the features I can use for my solution. 

1. Create PDFs Api as well as Convert PDF Api which is available in (Node.js Java .Net). As I was building a React Application, I chose to explore the Node js
With the help of 
### Create PDF Api
I could explore different formats such as dynamic HTML; Microsoft Word, PowerPoint, and Excel to create the PDF.
### Convert PDF Api
I could convert existing PDFs to popular formats, such as Microsoft Word, Excel, and PowerPoint, as well as text and image
Both these Api were useful for the Employer to create and amend a Contract. 

2. Second I explored the Apis which can help in Collaborating in the Contract between Employer and Candidate.

### Annotation Api 
We can add update, delete annotations , In this the Employee can comment on sections which needs clarification or changes and the Employer can clarify and make ammends when necessary

3. Next I explored the Adobe Sign API, 
### Adobe Sign API,
The Api's provided can creates an agreement,Can check the Signing Status of Both Employer and Employees,and finally Download the Signed Agreement.
Using the Api , Both Employer and Employee can sign on the Agreement digitally. Once the Agreement is Signed, the Contract can be downloaded locally by both    parties.

Once I had explored the Apis , I then was able to start building the components of the project.

## IMPLEMENTATION

Components of the Application

  1. Login/Registration 
  2. Contract Creation/Amends/Annotation of Contract
  3. Signing of Agreement and Downlading the Contract.


### Login and Registration

This platform had to support two types of Users, 
The Company: A company is an organization user of the platform as well 
The Candidate : The applicant that already has passed the interview, a candidate of the employee. One candidate can only be associated with one company.

### Registraion Screen

<img width="800" alt="Screenshot 2021-08-14 at 3 03 22 PM" src="https://user-images.githubusercontent.com/34758872/129441642-ddc7ea48-6ec1-48c7-905a-8362a0d736c9.png">

### Login Screen 

<img width="800" alt="Screenshot 2021-08-14 at 3 05 05 PM" src="https://user-images.githubusercontent.com/34758872/129441670-43240d06-a1b3-4d37-adba-8bd1d0bebeb5.png">

### Contract Creation

Once the Employer Login, 

A simple Workflow for Contract Creation. 

<img width="1252" alt="Screenshot 2021-08-14 at 3 06 27 PM" src="https://user-images.githubusercontent.com/34758872/129441717-71162b32-40ae-433a-88b2-37b3cb144797.png">

Workflow consisted of 3 steps
1. Choosing the candidate 
2. Adding the Contract Title
3. Content of Contract. 

A Notepad Editor was embedded in Application for Writing the Contract

<img width="691" alt="Screenshot 2021-08-14 at 3 12 57 PM" src="https://user-images.githubusercontent.com/34758872/129441914-89c2c48e-e2a1-44c3-878e-5b755753cf7c.png">


After this step the Contract becomes available to Candidate to View/Comment for (Clarification and Collaborate)

  
  Once the Candidate Approves and Finalizes the Contract, The Agreement can be initiated from the Employer, and The Candidate and Employer both Sign the Agreement
  

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
