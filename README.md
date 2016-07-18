# ERISWEB

ERIS Web: Event Recorder Information System for the Web

This is a Javascript object definition for an event recorder to run in web browser or under Node.js.

The ultimate specification for functionality is the ERIS 1.07 MS-DOS event recorder application. (See http://www.onlinezoologists.com/features/software/eris.html ) Obviously, things are different in Javascript and browsers than they were in MS-DOS.

What is event recording?

Event recording is the logging of events by an observer, in a fashion that allows for analysis of temporal sequences found in the event stream.
Event recording is accomplished through the use of an event recorder system, which accepts user input and logs it in some permanent or semi- permanent fashion.
While event recording can be used for interval sampling, the area in which it excels is in continuous recording of behavior, especially for focal animal follows.

Event Recording: Determining Suitability of the Technique

Advantages Over Checksheets:
No transcription errors in going to computer analysis
Ease of archiving exact copies of data
Consistent association of timestamp
Faster data entry for tokens
Allows for easier continuous recording
Touch-typists need not divide attention between animal and recorder

Disadvantages Compared to Checksheets:
More ways that hardware and software can fail
Data at risk until archived
Hazardous environments still favor checksheet use

Status of ERIS Web:

2016/07/17: Initial version, essentially a try-out of Javascript and the browser as an event recording system. Provides "accept", "delete" classes for tokens. Minimal HTML page interface. Does not yet implement several of the features noted in the ERIS 1.07 "lessons learned" list.


