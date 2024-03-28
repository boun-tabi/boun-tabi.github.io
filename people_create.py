from copy import deepcopy
import pandas as pd

############# Faculty Member #############

faculty_member_template = """
<div class="col-sm-6">
                    <div class="panel panel-default lab-panel">
                        <div class="panel-body">
                            <div class="row">

                                <div class="col-sm-5 col-xs-4">
                                    <img class="thumbnail" src="assets/photos/photo_dir" alt="faculty_member">
                                </div>
                                <div class="col-sm-7 col-xs-8">

                                    <div class="big-title">faculty_member</div>
                                    <ul class="list-unstyled">

                                        <li><strong>Email:</strong> mail_address</li>


                                        <li><strong>Office:</strong> office_code</li>


                                        <li><strong>Phone:</strong>phone_number</li>


                                        <li>
                                            <strong>Webpage:</strong>
                                            <a href="web_page">
                                                web_page
                                            </a>
                                        </li>

                                    </ul>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

def create_faculty_member(faculty_member):
    """
    Create a faculty member's profile page
    :param faculty_member: dictionary
    :return: string
    """
    template = deepcopy(faculty_member_template)
    for key, value in faculty_member.items():
        template = template.replace(key, value)
    return template


# faculty_member = {
#     'faculty_member': 'Lale Akarun',
#     'mail_address': 'akarun at boun.edu.tr',
#     'office_code': 'BM 27',
#     'phone_number': '+90 212 359 7250',
#     'web_page': 'http://www.cmpe.boun.edu.tr/~lale.akarun/',
#     'photo_dir': 'assets/photos/lale_akarun.jpg'
# }

# print(create_faculty_member(faculty_member))


############# PhD Student #############

phd_student_template = """
<div class="col-sm-6">
                    <div class="panel panel-default lab-panel">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12">

                                    <div class="big-title">student_name</div>
                                    <ul class="list-unstyled">
                                        <li>
                                            <strong>

                                                Advisor:

                                            </strong>
                                            advisor_name
                                        </li>

                                        <li>
                                            ms_degree_message
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""


def create_phd_student(phd_student):
    """
    Create a PhD student's profile page
    :param phd_student: dictionary
    :return: string
    """
    student_dict = deepcopy(phd_student)
    template = deepcopy(phd_student_template)
    if 'ms_degree_message' in student_dict.keys():
        template = template.replace('ms_degree_message', '<strong>MS Degree:</strong> ' + student_dict['ms_degree_message'])
        student_dict.pop('ms_degree_message')
    else:
        template = template.replace('ms_degree_message', '<br/>')
    for key, value in student_dict.items():
        template = template.replace(key, value)
    return template

# phd_student = {
#     'student_name': 'John Doe',
#     'advisor_name': 'Lale Akarun',
#     'ms_degree_message': 'MS degree from Bogazici University'
# }

# print(create_phd_student(phd_student))


############# MS Student #############

ms_student_template = """
<div class="col-sm-6">
                    <div class="panel panel-default lab-panel">
                        <div class="panel-body">
                            <div class="row">

                                <div class="col-xs-12">

                                    <div class="big-title">student_name</div>
                                    <ul class="list-unstyled">
                                        <li>
                                            <strong>

                                                Advisor:

                                            </strong>
                                            advisor_name
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

def create_ms_student(ms_student):
    """
    Create a MS student's profile page
    :param ms_student: dictionary
    :return: string
    """
    template = deepcopy(ms_student_template)
    for key, value in ms_student.items():
        template = template.replace(key, value)
    return template

# ms_student = {
#     'student_name': 'Jane Doe',
#     'advisor_name': 'Lale Akarun'
# }

# print(create_ms_student(ms_student))


############# Alumni #############

alumni_template = """
<div class="col-sm-6">
                    <div class="panel panel-default lab-panel">
                        <div class="panel-body">
                            <div class="row">

                                <div class="col-xs-12">

                                    <div class="big-title">student_name</div>
                                    <ul class="list-unstyled">
                                        <li>
                                            phd_degree_message
                                        </li>


                                        <li>
                                            ms_degree_message
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

#<strong>PhD Degree:</strong> in 2020 under the supervision of Arzucan Özgür
#<strong>MS Degree:</strong> in 2012 under the supervision of Arzucan Özgür

def create_alumni(alumni):
    """
    Create an alumni's profile page
    :param alumni: dictionary
    :return: string
    """
    alumni_dict = deepcopy(alumni)
    template = deepcopy(alumni_template)
    if 'phd_degree_message' in alumni_dict.keys():
        template = template.replace('phd_degree_message', '<strong>PhD Degree:</strong> ' + alumni_dict['phd_degree_message'])
        alumni_dict.pop('phd_degree_message')
    else:
        template = template.replace('phd_degree_message', '<br/>')
    if 'ms_degree_message' in alumni_dict.keys():
        template = template.replace('ms_degree_message', '<strong>MS Degree:</strong> ' + alumni_dict['ms_degree_message'])
        alumni_dict.pop('ms_degree_message')
    else:
        template = template.replace('ms_degree_message', '<br/>')
    for key, value in alumni_dict.items():
        template = template.replace(key, value)
    return template

# alumni = {
#     'student_name': 'Alice Doe',
#     'phd_degree_message': 'PhD degree in 2020 under the supervision of Arzucan Özgür',
#     'ms_degree_message': 'MS degree in 2012 under the supervision of Arzucan Özgür'
# }

# print(create_alumni(alumni))

#####################################
############# MERGE ALL #############
#####################################


# Read people from excel

faculty_members = pd.read_excel('database.xlsx', sheet_name='faculty').to_dict(orient='records')
phd_students = pd.read_excel('database.xlsx', sheet_name='phd').to_dict(orient='records')
ms_students = pd.read_excel('database.xlsx', sheet_name='ms').to_dict(orient='records')
alumnis = pd.read_excel('database.xlsx', sheet_name='alumni').to_dict(orient='records')

# Remove Nans if no message
for alumni in alumnis:
    if type(alumni['ms_degree_message']) != str:
        alumni.pop('ms_degree_message')
    if type(alumni['phd_degree_message']) != str:
        alumni.pop('phd_degree_message')

# Remove Nans if no message
for phd in phd_students:
    if type(phd['ms_degree_message']) != str:
        phd.pop('ms_degree_message')


# Read the html template
with open('people_dummy.html', 'r') as file:
    people_html = file.read()


faculty_members_here = ''
phd_students_here = ''
ms_students_here = ''
alumnis_here = ''

for faculty_member in faculty_members:
    faculty_members_here += create_faculty_member(faculty_member)

for phd_student in phd_students:
    phd_students_here += create_phd_student(phd_student)

for ms_student in ms_students:
    ms_students_here += create_ms_student(ms_student)

for alumni in alumnis:
    alumnis_here += create_alumni(alumni)

people_html = people_html.replace('faculty_members_here', faculty_members_here)
people_html = people_html.replace('phd_students_here', phd_students_here)
people_html = people_html.replace('ms_students_here', ms_students_here)
people_html = people_html.replace('alumnis_here', alumnis_here)

with open('people.html', 'w') as file:
    file.write(people_html)

