# Human Recruitment Signing platform

## OVERVIEW

My solution was to build a Web Application which can be used as Human Recruitment Signing platform. The Goal of the Application was to make the Contract Creation,Collaboration and Contract Signing be easy, seamless and secure for both Candidate and Employer. 

This Application leveraged Adobe PDF API and Adobe Sign API to build a web application (the Human Recruitment Signing platform).

## HOW I APPROACHED THE CHALLENGE

First I got familiar with the Adobe PDF API and Adobe Sign API functionalities needed for my solution. 

Create PDFs Api as well as Convert PDF Api were available in (Node.js Java .Net). As I was building a React Application, I chose to explore the Node.js Apis

### Create PDF Api
I could explore different formats such as dynamic HTML; Microsoft Word, PowerPoint, and Excel to create the PDF.

### Convert PDF Api
I could convert existing PDFs to popular formats, such as Microsoft Word, Excel, and PowerPoint, as well as text and image
Both these Api were useful for the Employer to create and amend a Contract. 

Second I explored the Apis which helped in Collaborating in the Contract between Employer and Candidate.

### Annotation Api 
This Api could be used to Collaborate and Comment between Employee and Candidate
We can add update, delete annotations , In this the Employee can comment on sections which needs clarification or changes and the Employer can clarify and make amends when necessary

Next I explored the Adobe Sign API, 

### Adobe Sign API
The Api's provided can Creates an agreement, Check the Signing Status of Both Employer and Employees,and finally Download the Signed Agreement.
Using the Api, Both Employer and Employee can sign on the Agreement digitally. Once the Agreement is Signed, the Contract can be downloaded locally by both    parties.

Once I had explored the Apis, I then was able to start Implementing the Components of the project.

## IMPLEMENTATION

Components of the Application

### Login and Registration

This platform had to support two types of Users, 
The Company: A company is an organization user of the platform as well 
The Candidate : The applicant that already has passed the interview, a candidate of the employee. One candidate can only be associated with one company.

The company and the candidate users can Log in to the application, and On the registration screen, there should be an option to select the role Company or Candidate to be registered.

### Registration Screen

<img width="800" alt="Screenshot 2021-08-14 at 3 03 22 PM" src="https://user-images.githubusercontent.com/34758872/129441642-ddc7ea48-6ec1-48c7-905a-8362a0d736c9.png">

### Login Screen 

<img width="800" alt="Screenshot 2021-08-14 at 3 05 05 PM" src="https://user-images.githubusercontent.com/34758872/129441670-43240d06-a1b3-4d37-adba-8bd1d0bebeb5.png">

### Contract Creation

Once the Employer Logs In, 

Website presented a Simple Workflow for Contract Creation. 

<img width="800" alt="Screenshot 2021-08-14 at 3 06 27 PM" src="https://user-images.githubusercontent.com/34758872/129441717-71162b32-40ae-433a-88b2-37b3cb144797.png">

Workflow consisted of 3 steps
1. Choosing the candidate 
2. Adding the Contract Title
3. Content of Contract. 

A Notepad Editor was embedded in Application for Writing the Contract

<img width="800" alt="Screenshot 2021-08-14 at 3 12 57 PM" src="https://user-images.githubusercontent.com/34758872/129441914-89c2c48e-e2a1-44c3-878e-5b755753cf7c.png">

Dashboard

<img width="800" alt="Screenshot 2021-08-14 at 3 21 36 PM" src="https://user-images.githubusercontent.com/34758872/129442195-c36eb59c-09e0-442b-a1d0-38c92eb77c04.png">

After this Step the Contract becomes available to Candidate to View/Comment for (Clarification and Collaborate)

Once the Candidate Approves and Finalizes the Contract, The Agreement can be initiated from the Employer, and The Candidate and Employer both Sign the Agreement
  
### Contract Collaboration 

Once the Contract is Created , Both the Employer and Candidate can collaborate to finalize the Contract

<img width="800" alt="Screenshot 2021-08-14 at 3 19 34 PM" src="https://user-images.githubusercontent.com/34758872/129442260-64f7cf5c-d892-4688-96d7-71730b3b2d0d.png">

### Contract Signing

Once the Contract is Finalized.The Agreement can be initiated from the Employer, and The Candidate and Employer both Sign the Agreement

<img width="800" alt="Screenshot 2021-08-14 at 3 20 05 PM" src="https://user-images.githubusercontent.com/34758872/129442321-05257707-542b-4c36-b130-9f5bc5257ba7.png">

<img width="800" alt="Screenshot 2021-08-14 at 3 20 21 PM" src="https://user-images.githubusercontent.com/34758872/129442337-bbc3d8da-fcaf-42e5-9c11-30a3b4195d6b.png">

Once the Agreement is Signed, both parties can download the Document .
 
 
## FINAL THOUGHTS 

Being a Android Developer, and as it was my first time exploring Web Development, The Documentation as well as the Sample Examples and Demos provided in Adobe website helped me to get started on this easily and was able to complete this Project quickly.

## Video

Video Link :  https://drive.google.com/file/d/19JBmwXcSaQyuHtjxq8bBjydVpGbK3OVy/view?usp=sharing
or
https://www.youtube.com/watch?v=mid4N7Qq81c&feature=youtu.be

