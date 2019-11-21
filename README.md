# takamitest
Basic crud nodejs express framework

# Before running this project
Clone repo and install npm packages using 'npm install' command.

Shield Manager
URL Samples:



Read: 
http://localhost:3000/shield

Create: 
http://localhost:3000/shield/create/8086971aa3eb1b49d6a056630a03c10f/36000/700/36/1/2019-02-14/300

Update: 
http://localhost:3000/shield/edit/1/0ef8f77e95f68e1402454302a96ca013/28000/400/28/1/2018-05-18/600

Delete: 
http://localhost:3000/shield/remove/10
<pre>
DB Objects:
USE [demo]
GO

CREATE TABLE [dbo].[SHIELD_TYPE](
[shiTypId] [int] NOT NULL,
[shiTypName] [varchar](9) NULL,
CONSTRAINT [PK_SHIELD_TYPE] PRIMARY KEY CLUSTERED
(
[shiTypId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[SHIELD](
[shiId] [int] IDENTITY(1,1) NOT NULL,
[shiIdManufacturer] [varchar](50) NULL,
[shiWattsEnergyConsumption] [int] NULL,
[shiNewtonsForceBreakpoint] [int] NULL,
[shiNewtonsMinimumForceReaction] [int] NULL,
[shiTypeId] [int] NULL,
[shiDateRelease] [date] NULL,
[shiDaysLifetime] [int] NULL,
CONSTRAINT [PK_SHIELD] PRIMARY KEY CLUSTERED
(
[shiId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SHIELD]  WITH CHECK ADD  CONSTRAINT [FK_SHIELD_SHIELD_TYPE] FOREIGN KEY([shiTypeId])
REFERENCES [dbo].[SHIELD_TYPE] ([shiTypId])
GO

ALTER TABLE [dbo].[SHIELD] CHECK CONSTRAINT [FK_SHIELD_SHIELD_TYPE]
GO
</pre>
